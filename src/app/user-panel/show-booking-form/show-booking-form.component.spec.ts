import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBookingFormComponent } from './show-booking-form.component';

describe('ShowBookingFormComponent', () => {
  let component: ShowBookingFormComponent;
  let fixture: ComponentFixture<ShowBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBookingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
