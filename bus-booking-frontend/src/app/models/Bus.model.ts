import { BusSeatModel } from "./BusSeat.model";

export class BusModel {
    busId?: number;
    busNumber?: string;
    operatorName?: string;
    busName?: string;
    boardingPoint?: string;
    droppingPoint?: string;
    availableSeat?: number;
    busFare?: number;
    boardingTime?: string;
    droppingTime?: string;
    journeyDuration?: string;
    journeyDate?: string;
    seatDetails?: BusSeatModel[];
}