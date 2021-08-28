import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin-panel/auth/login/login.component';
import { AdminPageComponent } from './admin-panel/other/admin-page.component';
import { BookingDetailComponent } from './admin-panel/other/booking-detail/booking-detail.component';
import { BookingFormComponent } from './admin-panel/other/booking-form/booking-form.component';
import { CalenderViewComponent } from './admin-panel/other/calender-view/calender-view.component';
import { UserBookingDetailComponent } from './admin-panel/other/user-booking-detail/user-booking-detail.component';
import { AuthgaurdService } from './service/authgaurd.service';
import { BookingConfirmedComponent } from './user-panel/booking-confirmed/booking-confirmed.component';
import { ShowBookingFormComponent } from './user-panel/show-booking-form/show-booking-form.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'home', component:AdminPageComponent, canActivate: [AuthgaurdService], children:[
    {path: 'booking-form', component:BookingFormComponent},
    {path: 'booking-form/:id', component:BookingFormComponent},
    {path: 'booking-detail', component:BookingDetailComponent},
    {path: 'booking-detail/:id', component:BookingDetailComponent},
    {path: 'user-booking/:id', component:UserBookingDetailComponent},
    {path: 'user-booking', component:UserBookingDetailComponent},
    {path: 'calender-view', component:CalenderViewComponent},
    {path: 'calender-view/:id', component:CalenderViewComponent}
  ]},
  {path: 'show-booking/:id', component: ShowBookingFormComponent },
  {path: 'booking-confirmed/:id', component: BookingConfirmedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
