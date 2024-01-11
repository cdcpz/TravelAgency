import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { BookingService } from '../../shared/services/booking.service';
import { MatTableDataSource } from '@angular/material/table';
import { IBookingReponse } from '../../shared/models/booking.model';
import { ILoginResponse } from '../landing/models/login.model';
import { LocalDbPersist } from '../../shared/services/db.service';
import { DB_FLAGS } from '../../shared/models/db.model';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { PageTitleService } from '../../shared/services/page-title.service';

@Component({
  selector: 'app-traveler',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ToolbarComponent,
    PageTitleComponent
  ],
  templateUrl: './traveler.component.html',
  styleUrl: './traveler.component.scss'
})
export class TravelerComponent {

  constructor() {}
}
