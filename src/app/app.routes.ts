import { Routes } from '@angular/router';
import { layoutRoute } from './pages/layout/layout.routes';
import { LandingComponent } from './pages/landing/landing.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { travelerRoute } from './pages/traveler/traveler.routes';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        ...layoutRoute
    },
    {
        ...travelerRoute
    }
];
