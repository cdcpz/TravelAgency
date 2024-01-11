import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHotelModalComponent } from './manage-hotel-modal.component';

describe('ManageHotelModalComponent', () => {
  let component: ManageHotelModalComponent;
  let fixture: ComponentFixture<ManageHotelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageHotelModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageHotelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
