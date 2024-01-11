import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReservationModalComponent } from './manage-reservation-modal.component';

describe('ManageReservationModalComponent', () => {
  let component: ManageReservationModalComponent;
  let fixture: ComponentFixture<ManageReservationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageReservationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
