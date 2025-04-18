import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBusComponent } from './components/search-bus/search-bus.component';
import { BusListComponent } from './components/bus-list/bus-list.component';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection.component';
import { PassengerInfoComponent } from './components/passenger-info/passenger-info.component';
import { ReviewTicketComponent } from './components/review-ticket/review-ticket.component';
import { ViewTicketComponent } from './components/view-ticket/view-ticket.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { SidebarModule } from 'primeng/sidebar';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    SearchBusComponent,
    BusListComponent,
    SeatSelectionComponent,
    PassengerInfoComponent,
    ReviewTicketComponent,
    ViewTicketComponent,
    HeaderComponent,
    NumbersOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    SidebarModule,
    TabViewModule,
    ToastModule,
    BadgeModule, 
    AvatarModule,
    AutoCompleteModule,
    CalendarModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
