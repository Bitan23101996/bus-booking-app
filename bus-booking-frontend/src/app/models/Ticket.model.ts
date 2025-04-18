import { BusModel } from "./Bus.model";
import { PassengerModel } from "./Passenger.Model";

export class TicketModel {
    ticketId?: string;
    totalFare?: number;
    busDetails?: BusModel;
    passengerList?: PassengerModel[];
}