import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRoomModalComponent } from './manage-room-modal.component';

describe('ManageRoomModalComponent', () => {
  let component: ManageRoomModalComponent;
  let fixture: ComponentFixture<ManageRoomModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRoomModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageRoomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
