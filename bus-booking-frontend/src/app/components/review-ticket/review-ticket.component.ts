import { Component, Input } from '@angular/core';
import { BusModel } from 'src/app/models/Bus.model';
import { PassengerModel } from 'src/app/models/Passenger.Model';

@Component({
  selector: 'app-review-ticket',
  templateUrl: './review-ticket.component.html',
  styleUrls: ['./review-ticket.component.css']
})
export class ReviewTicketComponent {
@Input() selectedBus?: BusModel = {};
@Input() passengerList?: PassengerModel[] = [];

}
