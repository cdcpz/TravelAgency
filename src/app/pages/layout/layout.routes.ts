import { Route, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './pages/home/home.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { BookingComponent } from './pages/booking/booking.component';
import { ManageReservationModalComponent } from './pages/booking/components/manage-reservation-modal/manage-reservation-modal.component';
import { RoomComponent } from './pages/room/room.component';
import { loginGuard } from '../../shared/guards/login.guard';
import { ManageBookingComponent } from '../traveler/pages/manage-booking/manage-booking.component';

export const layoutRoute: Route = {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [loginGuard],
    children: [

        
        {
            path: '',
            component: HomeComponent
        },
        {
            path: 'hoteles',
            component: HotelComponent
        },
        {
            path: 'booking',
            component: BookingComponent
        },
        {
            path: 'manage/:booking',
            component: ManageBookingComponent
        }
        ,
        {
            path: 'room',
            component: RoomComponent
        }


    ] 
};
