import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, CommonModule, CurrencyPipe } from '@angular/common';
import { IRoom } from '../../../models/booking.model';


@Component({
  selector: 'app-card-hotel',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    NgFor,
    CommonModule,
    CurrencyPipe,
  ],
  templateUrl: './card-hotel.component.html',
  styleUrl: './card-hotel.component.scss'
})
export class CardHotelComponent {
  @Input() imageUrl: string = ''
  @Input() location: string = ''
  @Input() city: string = ''
  @Input() price: number = 0
  @Input() hotel: string = '';
  @Input() quantityPeople: number = 0
  @Input() room: IRoom = {} as IRoom
  @Output() selected = new EventEmitter<IRoom>()

  click() {
    this.selected.emit(this.room)
  }
}
