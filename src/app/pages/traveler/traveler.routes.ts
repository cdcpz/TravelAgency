import { Route, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { loginGuard } from '../../shared/guards/login.guard';
import { TravelerComponent } from './traveler.component';
import { ManageBookingComponent } from './pages/manage-booking/manage-booking.component';
import { CardHotelComponent } from '../../shared/components/card/card-hotel/card-hotel.component';

export const travelerRoute: Route = {
    path: 'traveler',
    component: TravelerComponent,
    canActivate: [loginGuard],
    children: [
        {
            path: '',
            component: HomeComponent
        },
        {
            path: 'manage',
            component: ManageBookingComponent
        },
        {
            path: 'manage/:booking',
            component: ManageBookingComponent
        }
    ] 
};
