import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin-panel/auth/login/login.component';
import { BookingFormComponent } from './admin-panel/other/booking-form/booking-form.component';
import { ShowBookingFormComponent } from './user-panel/show-booking-form/show-booking-form.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularFireStorageModule } from '@angular/fire/storage';
import { AdminPageComponent } from './admin-panel/other/admin-page.component';
import { BookingDetailComponent } from './admin-panel/other/booking-detail/booking-detail.component';
import { UserBookingDetailComponent } from './admin-panel/other/user-booking-detail/user-booking-detail.component';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { FilterPipe } from './pipe/filter.pipe';
import { BookingConfirmedComponent } from './user-panel/booking-confirmed/booking-confirmed.component';
import { CalenderViewComponent } from './admin-panel/other/calender-view/calender-view.component';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClientModule } from '@angular/common/http';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookingFormComponent,
    ShowBookingFormComponent,
    AdminPageComponent,
    BookingDetailComponent,
    UserBookingDetailComponent,
    FilterPipe,
    BookingConfirmedComponent,
    CalenderViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    CommonModule,
    ToastrModule.forRoot(),
     ToastNoAnimationModule.forRoot(),
     FullCalendarModule,
     CalendarModule,
     BrowserAnimationsModule,
     HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
