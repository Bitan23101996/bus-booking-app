import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  private selectedSeats$ = new Subject<any>();  // Subject to broadcast data

  constructor() { }

  // Method to emit data
  setSeats(data: any) {
    this.selectedSeats$.next(data);
  }
  // Method to subscribe to data changes
  getSeats() {
    return this.selectedSeats$.asObservable();
  }
}
