import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BusModel } from 'src/app/models/Bus.model';
import { PassengerModel } from 'src/app/models/Passenger.Model';
import { TicketModel } from 'src/app/models/Ticket.model';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {
  @Input() selectedBus?: BusModel = {};
  @Input() selectedSeats?: string = "N/A";
  @Input() passengerList?: PassengerModel[] = [];
  @Input() totalFare?: number = 0;
  ticketId:string = 'N/A';
  @Output() uniqueTicketId: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(){
    this.ticketId = this.generateTicketId();
    this.uniqueTicketId.emit(this.ticketId);
  }

  generateTicketId() {
    // Generate a unique ticket ID based on the current date and a random number
    const timestamp = new Date().getTime();  // Current time in milliseconds
    const randomPart = Math.floor(Math.random() * 10000);  // Random 4-digit number
    // Extract the last 1 digit of the timestamp to ensure the length stays within 5
    const shortTimestamp = timestamp.toString().slice(-1);  // Extract the last digit

    // Combine the timestamp's last digit and the random part to ensure the length stays at 5
    const ticketId = `${shortTimestamp}${randomPart.toString().slice(-4)}`;  // Limit the random part to 4 digits
    // Combine both parts to form a unique ticket ID
    return ticketId;
  }
}
