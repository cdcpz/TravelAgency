import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { HotelService } from '../../../services/hotel.service';

@Component({
  selector: 'app-manage-reservation-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './manage-reservation-modal.component.html',
  styleUrl: './manage-reservation-modal.component.scss'
})


export class ManageReservationModalComponent implements OnInit {

  id = "";
  list : any;
  constructor(
    private activateRouter: ActivatedRoute,
    ) {

    this.id = this.activateRouter.snapshot.params['detail'];
  }

  ngOnInit(): void {
    // this.getReservationById()
  }

  // getReservationById() {
  //   this.list = this.service.getReservationById(this.id)
  //   console.log(this.list)
  // }
}
