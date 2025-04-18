import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormModel } from 'src/app/models/CustomForm.Model';
import { BusSeatModel } from '../../models/BusSeat.model';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.css']
})
export class PassengerInfoComponent implements OnInit, DoCheck {
  @Input() selectedSeats?: BusSeatModel[] = [];
  passengerForm!: FormGroup;
  @Output() passengerListInfo: EventEmitter<CustomFormModel> = new EventEmitter<CustomFormModel>();

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.createPassengerForm();

    // Clear the existing passenger forms
    this.passengers.clear();

    // Add new passenger forms based on the selected seats
    if (this.selectedSeats!.length > 0) {
      this.selectedSeats?.forEach((seat: BusSeatModel) => {
        this.addPassengerForm(seat);
      });
    }
  }

  createPassengerForm() {
    this.passengerForm = this.fb.group({
      passengers: this.fb.array([])  // FormArray to hold passenger details
    });
  }

  // Function to add a passenger form
  addPassengerForm(seat: BusSeatModel) {
    const passengerForm = this.fb.group({
      seatNumber: seat.seatNumber,
      passengerName: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(5)]],
      gender: ['0', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
    this.passengers.push(passengerForm);
    // console.log("Form Array:", this.passengers);
  }

  // Getter for the passengers FormArray
  get passengers() {
    return (this.passengerForm.get('passengers') as FormArray);
  }

  ngDoCheck() {
    // console.log("Form Valid", this.passengerForm.valid);
    const data: CustomFormModel = {
      value: this.passengerForm.value,
      isValid: this.passengerForm.valid,
    };
    this.passengerListInfo.emit(data);
  }
}
