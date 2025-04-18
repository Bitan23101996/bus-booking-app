export class BusSeatModel {
    seatId?: number;
    seatNumber?: number;
    isAvailable?: boolean;
    isSelected?: boolean;
    rowPosition?: RowPosition;
    seatPrice?: number
}

// Define interfaces for the structure
interface RowPosition {
    rowNo?: number;
    isSeperate?: boolean;
}