import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchBusParamModel } from 'src/app/models/SearchBusParam.model';
import { BusService } from 'src/app/services/bus.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent implements OnInit {
  busSearchForm!: FormGroup; //bus search form
  sourceLocations: string[] = [];  // This will hold the list of source locations
  destinationLocations: string[] = []; // This will hold the list of destination locations
  availableBuses: any[] = []; //availble bus list

  constructor(private fb: FormBuilder, private busService: BusService) {

  }

  ngOnInit(): void {
    this.createBusSearchForm();
    // Watch for value changes to validate source != destination
    this.busSearchForm.get('source')?.valueChanges.subscribe(() => {
      this.validateLocations();
    });

    this.busSearchForm.get('destination')?.valueChanges.subscribe(() => {
      this.validateLocations();
    });
  }

  //Method: Bus search form
  createBusSearchForm() {
    this.busSearchForm = this.fb.group({
      source: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      travelDate: ['', [Validators.required]]
    });
  }

  //Method: Validate Locations
  validateLocations() {
    const source = this.busSearchForm.get('source')?.value;
    const destination = this.busSearchForm.get('destination')?.value;
    //Check if source and destination are same - then set error
    if (source === destination) {
      this.busSearchForm.get('destination')?.setErrors({ sameLocation: true });
    }
  }

  // This method is used to get the formatted date as string using formatDate function
  getFormattedDate(travelDate: Date): string {
    return formatDate(travelDate, 'dd/MM/yyyy', 'en-US');
  }

  isDataFetched: boolean = false;
  searchBuses() {
    if (this.busSearchForm.invalid) {
      return;
    }
    const { source, destination } = this.busSearchForm.value;
    //convert travel date to string
    const travelDate = this.getFormattedDate(this.busSearchForm.get('travelDate')?.value);

    //Creating payload for API call
    let payload: SearchBusParamModel = {
      source, destination, travelDate
    }
    //Bus Search - API Call
    this.busService.getBuses(payload).subscribe({
      next: (data) => {
        console.log("Available Bus From API:", data);
        this.availableBuses = data || [];
        this.isDataFetched = true;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Fetch the list of source stations (from the static data)
  searchSourceLocation(event: any) {
    if (event && event.query) {
      this.busService.getStations(event.query).subscribe((locations) => {
        this.sourceLocations = locations || [];
      });
    }
  }

  // Fetch the list of destination stations (from the static data)
  searchDestinationLocation(event: any) {
    if (event && event.query) {
      this.busService.getStations(event.query).subscribe((locations) => {
        this.destinationLocations = locations || [];
      });
    }
  }
}

