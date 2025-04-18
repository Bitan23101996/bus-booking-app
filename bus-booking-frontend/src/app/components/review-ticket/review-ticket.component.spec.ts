import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTicketComponent } from './review-ticket.component';

describe('ReviewTicketComponent', () => {
  let component: ReviewTicketComponent;
  let fixture: ComponentFixture<ReviewTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewTicketComponent]
    });
    fixture = TestBed.createComponent(ReviewTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
