import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsHotelModalComponent } from './rooms-hotel-modal.component';

describe('RoomsHotelModalComponent', () => {
  let component: RoomsHotelModalComponent;
  let fixture: ComponentFixture<RoomsHotelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsHotelModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomsHotelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
