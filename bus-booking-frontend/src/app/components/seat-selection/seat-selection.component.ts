import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusModel } from 'src/app/models/Bus.model';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { BusSeatModel } from '../../models/BusSeat.model';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  @Input() selectedBus?: BusModel;
  listOfSeat: BusSeatModel[] | undefined = [];
  selectedSeatList: BusSeatModel[] | undefined = [];
  @Output() selectedSeats: EventEmitter<BusSeatModel[]> = new EventEmitter<BusSeatModel[]>();


  constructor(private messageService: MessageService) {
    
  }

  ngOnInit() {
    if (this.selectedBus) {
      this.listOfSeat = this.selectedBus.seatDetails;
    }
   /*  this.broadcastService.getSeats().subscribe((data) => {
      this.selectedSeatList = data;
      console.log("Child seat list", this.selectedSeatList)
    }); */
    
    // console.log("Child seat list", this.selectedSeatList)
  }

 

  selectSeat(event: any, seat: BusSeatModel) {
    //Select seat
    if (event.target.checked) {
      seat.isSelected = event.target.checked;
      this.selectedSeatList!.push(seat);      
    } else {
      this.selectedSeatList = this.selectedSeatList!.filter(item => item.seatId !== seat.seatId);
    }
    this.selectedSeats.emit(this.selectedSeatList);
  }

  /* listOfSeat: BusSeatModel[] = [
    {
      seatId: 1,
      seatNumber: 1,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: false
      }
    },
    {
      seatId: 2,
      seatNumber: 2,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: false
      }
    },
    {
      seatId: 3,
      seatNumber: 3,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: true
      }
    },
    {
      seatId: 4,
      seatNumber: 4,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: false
      }
    },
    /* {
      seatId: 5,
      seatNumber: 5,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 6,
      seatNumber: 6,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 7,
      seatNumber: 7,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: true
      }
    },
    {
      seatId: 8,
      seatNumber: 8,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 1,
      seatNumber: 1,
      isAvailable: false,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: false
      }
    },
    {
      seatId: 2,
      seatNumber: 2,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: false
      }
    },
    {
      seatId: 3,
      seatNumber: 3,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: true
      }
    },
    {
      seatId: 4,
      seatNumber: 4,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: false
      }
    },
    {
      seatId: 5,
      seatNumber: 5,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 6,
      seatNumber: 6,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 7,
      seatNumber: 7,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: true
      }
    },
    {
      seatId: 8,
      seatNumber: 8,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 1,
      seatNumber: 1,
      isAvailable: false,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: false
      }
    },
    {
      seatId: 2,
      seatNumber: 2,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: false
      }
    },
    {
      seatId: 3,
      seatNumber: 3,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: true
      }
    },
    {
      seatId: 4,
      seatNumber: 4,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: false
      }
    },
    {
      seatId: 5,
      seatNumber: 5,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 6,
      seatNumber: 6,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 7,
      seatNumber: 7,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: true
      }
    },
    {
      seatId: 8,
      seatNumber: 8,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 1,
      seatNumber: 1,
      isAvailable: false,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: false
      }
    },
    {
      seatId: 2,
      seatNumber: 2,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: false
      }
    },
    {
      seatId: 3,
      seatNumber: 3,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: true
      }
    },
    {
      seatId: 4,
      seatNumber: 4,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 1,
        isSeperate: false
      }
    },
    {
      seatId: 5,
      seatNumber: 5,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 6,
      seatNumber: 6,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 7,
      seatNumber: 7,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: true
      }
    },
    {
      seatId: 8,
      seatNumber: 8,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },

    {
      seatId: 9,
      seatNumber: 9,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 10,
      seatNumber: 10,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 11,
      seatNumber: 11,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 12,
      seatNumber: 12,
      isAvailable: true,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
    {
      seatId: 13,
      seatNumber: 13,
      isAvailable: false,
      isSelected: true,
      seatPrice: 150,
      rowPosition: {
        rowNo: 2,
        isSeperate: false
      }
    },
  ] */

}
