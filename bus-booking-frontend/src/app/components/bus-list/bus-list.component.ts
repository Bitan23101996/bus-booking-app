import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusSeatModel } from 'src/app/models/BusSeat.model';
import { CustomFormModel } from 'src/app/models/CustomForm.Model';
import { PassengerModel } from 'src/app/models/Passenger.Model';
import { BroadcastService } from 'src/app/services/broadcast.service';
import { BusModel } from '../../models/Bus.model';
import { jsPDF } from 'jspdf';
import { TicketModel } from 'src/app/models/Ticket.model';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {
  selectedBusId: number | undefined = 0;
  @Input() busList: BusModel[] = []; //Get Available bus list from parent component - (bus search component)
  constructor(private broadcastService: BroadcastService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
  }

  //Get Selected Seat List from child
  selectedSeatList: BusSeatModel[] = [];

  //Total Bus fare
  totalFare: number = 0;

  //List of passenger
  passengerList: PassengerModel[] = [];

  //Flag: Sidebar show/hide
  isSidebarVisible: boolean = false;

  //Flag: Seat selection page show/hide
  isSeatSelectionPageVisible: boolean = false;

  //Flag: Passenger Info Page show/hide
  isPassengerInfoVisible: boolean = false;

  //Flag: Review bus ticket page show/hide
  isReviewBusTicketVisible: boolean = false;

  //Flag: View Ticket Page show/hide
  isViewTicketVisible: boolean = false;

  selectedBus: BusModel = {};
  //Method : Open sidebar
  displaySidebar(bus: BusModel) {
    this.isSidebarVisible = true;
    this.isSeatSelectionPageVisible = true;
    this.isPassengerInfoVisible = false;
    this.selectedBus = bus;
    this.selectedBusId = bus.busId;

  }

  resetCheckItem(seatDetails: BusSeatModel[]) {
    let tempItemArr: BusSeatModel[] = [];
    if (this.selectedBus) {
      seatDetails.forEach((item: BusSeatModel) => {
        item.isSelected = false;
        tempItemArr.push(item);
      })
    }
    this.selectedBus.seatDetails = tempItemArr;
  }

  //Method: Close sidebar
  closeSidebar() {
    this.isSidebarVisible = false;
    this.isSeatSelectionPageVisible = false;
    this.isPassengerInfoVisible = false;
    this.isReviewBusTicketVisible = false;
    this.isViewTicketVisible = false;
    this.selectedSeatList = [];
    if (this.selectedBus && this.selectedBus.seatDetails) {
      this.resetCheckItem(this.selectedBus.seatDetails);
    }

    this.totalFare = 0;
  }

  //Method: After Choose seat - Proceed click
  chooseYourSeatAndProceed() {
    this.isSeatSelectionPageVisible = false;
    this.isPassengerInfoVisible = true;
    this.isReviewBusTicketVisible = false;
    this.isViewTicketVisible = false;
  }

  //Method: Back to Seat Section - Click
  backToSeatSelection() {
    this.isSeatSelectionPageVisible = true;
    this.isPassengerInfoVisible = false;
    this.isReviewBusTicketVisible = false;
    this.isViewTicketVisible = false;
    this.broadcastService.setSeats(this.selectedSeatList);
  }

  //Method: Click on continue in passsenger details page
  reviewTickit() {
    this.isReviewBusTicketVisible = true;
    this.isPassengerInfoVisible = false;
    this.isSeatSelectionPageVisible = false;
  }

  backToPassengerDetails() {
    this.isReviewBusTicketVisible = false;
    this.isViewTicketVisible = false;
    this.isPassengerInfoVisible = true;
  }
  viewTickit() {
    this.isReviewBusTicketVisible = false;
    this.isPassengerInfoVisible = false;
    this.isViewTicketVisible = true;
  }

  getSelectedSeatList(selectedSeats: BusSeatModel[]) {
    this.selectedSeatList = selectedSeats;
    // console.log("Array", selectedSeats)
    this.broadcastService.setSeats(selectedSeats);
    this.getTotalFare();

  }

  isPassengerFormValid: boolean | undefined = false;


  getPassengerDetails(passengerForm: CustomFormModel) {
    this.passengerList = passengerForm.value.passengers;
    this.isPassengerFormValid = passengerForm.isValid;

  }

  getCommaSeparatedSeats(): string {
    if (this.selectedSeatList.length > 0) {
      return this.selectedSeatList.filter(item => item.seatNumber).map(item => item.seatNumber).join(', ');
    }
    else {
      return "N/A"
    }
  }

  getTotalFare() {
    if (this.selectedSeatList.length > 0 && this.selectedBus && this.selectedBus.busFare) {
      this.totalFare = this.selectedSeatList.length * this.selectedBus.busFare;
    } else {
      this.totalFare = 0;
    }
  }

  ticketDetails: TicketModel = {
    "ticketId": "1234",
    "totalFare": 1200,
    "busDetails": {
      "busId": 4567,
      "busNumber": "WB14N-5220",
      "operatorName": "XYZ Travels",
      "busName": "Luxury Express",
      "boardingPoint": "Downtown Station",
      "droppingPoint": "Central Bus Terminal",
      "boardingTime": "10:00 AM",
      "droppingTime": "4:00 PM",
      "journeyDate": "2025-03-25"
    },
    "passengerList": [
      {
        "seatNumber": 12,
        "passengerName": "John Doe",
        "age": 30,
        "gender": "M"
      },
      {
        "seatNumber": 15,
        "passengerName": "Jane Smith",
        "age": 28,
        "gender": "F"
      }
    ]
  }

  ticketId: string = "N/A";
  getUniqueTicketId(ticketId: string) {
    this.ticketId = ticketId;
  }

  printOrDownloadTicket(status: string) {
    const doc = new jsPDF();
    let xPosition: number = 20;
    let yPosition: number = 150;

    // Set fonts and styles
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);  // Black color text

    // Header Section
    doc.setFontSize(22);
    doc.text('Bus Ticket', 105, 20, { align: 'center' });

    // Draw a rectangle as a border for the ticket
    doc.setDrawColor(0, 0, 0);  // Black color for the border
    doc.setLineWidth(0.5);
    doc.rect(10, 35, 190, 250);

    // Add a logo (optional, you can add your company's logo)
    doc.addImage('assets/images/logo_1.jpeg', 'JPEG', 15, 5, 25, 25);  // Un-comment and modify this if you have a logo

    // Ticket Information Section
    doc.setFontSize(14);

    doc.setFont("helvetica", "bold");
    doc.text(`Ticket ID: `, 20, 50);
    doc.text(`Bus Type:`, 20, 70);
    doc.text(`Seat Number:`, 20, 90);
    doc.text(`Boarding Time: `, 20, 110);
    doc.text(`Boarding Point: `, 20, 130);
    doc.text(`Total Fare: `, 130, 150);
    doc.text(`Bus Number:`, 130, 50);
    doc.text(`Operator Name:`, 130, 70);
    doc.text(`Journey Date:`, 130, 90);
    doc.text(`Dropping Time:`, 130, 110);
    doc.text(`Dropping Point:`, 130, 130);




    doc.setFont("courier", "normal");
    doc.text(`#${this.ticketId}`, 20, 60);
    doc.text(`${this.selectedBus.busName}`, 20, 80); //
    doc.text(`${this.getCommaSeparatedSeats()}`, 20, 100);
    doc.text(`${this.selectedBus.boardingTime}`, 20, 120);
    doc.text(`${this.selectedBus.boardingPoint}`, 20, 140);
    doc.text(`Rs.${this.totalFare}`, 130, 160);
    doc.text(`${this.selectedBus.busNumber}`, 130, 60);
    doc.text(`${this.selectedBus.operatorName}`, 130, 80); //
    doc.text(`${this.selectedBus.journeyDate}`, 130, 100);
    doc.text(`${this.selectedBus.droppingTime}`, 130, 120);
    doc.text(`${this.selectedBus.droppingPoint}`, 130, 140);

    if (this.passengerList.length > 0) {
      this.passengerList.forEach((passenger, index) => {
        // Each passenger's name and seat number
        const passengerDetails = `${passenger.passengerName}, ${passenger.age} - ${passenger.gender === 'M' ? 'Male' : 'Female'}`;
        doc.setFont("helvetica", "bold");
        doc.text(`Passenger - ${index + 1}`, xPosition, yPosition);
        yPosition += 10;
        // Dynamically set the y position for each passenger
        doc.setFont("courier", "normal");
        doc.text(passengerDetails, xPosition, yPosition);
        // Increment the y position for the next passenger
        yPosition += 10; // Adjust this value depending on line spacing
      });
    }

    // Footer Section (Optional)
    doc.setFontSize(10);
    doc.text('Thank you for choosing our service!', 105, 250, { align: 'center' });

    if (status === 'PRINT') {
      // Print the document
      doc.autoPrint();
      window.open(doc.output('bloburl'), '_blank');
    } else if (status === 'DOWNLOAD') {
      // Save the PDF
      doc.save(`ticket_${this.ticketId}.pdf`)
    } else {
      //do nothing
    }



    ;
  }
}
