import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as locationData from '../../assets/json/locations.json';
import * as busesData from '../../assets/json/buses.json';
import { SearchBusParamModel } from '../models/SearchBusParam.model';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private locationList = (locationData as any).default;
  private busList = (busesData as any).default;

  constructor(private http: HttpClient) { }

  // Return only location names for autocomplete
  getStations(query: string): Observable<string[]> {
    let filteredStations: any;
    // Filter stations based on query matching locationName
    if (this.locationList.length > 0) {
      filteredStations = this.locationList.filter((station: any) => station.locationName.toLowerCase().includes(query.toLowerCase()))
        .map((station: any) => station.locationName); // Return only the location names

    }
    return of(filteredStations);
  }

  //Return all available buses
  getBuses(payload: SearchBusParamModel): Observable<any[]> {
    const {source, destination, travelDate} = payload;
    const filteredBuses = this.busList.filter(
      (bus: any) => bus.boardingPoint === source && bus.droppingPoint === destination && bus.journeyDate === travelDate
    );
    return of(filteredBuses);
  }
}
