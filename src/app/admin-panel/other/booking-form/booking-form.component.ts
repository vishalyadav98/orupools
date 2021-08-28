import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrupoolService } from 'src/app/service/orupool.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {

  bookingFormData: any = FormGroup;
  array: any = []
  docdate: any;
  id: any;
  formValue: any;
  status = "Select Property"
  property: any =
    [{
      propertyId: 0,
      propertyTitle: "BRvilla"
    },
    {
      propertyId: 1,
      propertyTitle: "adharshvilla"
    },
    {
      propertyId: 2,
      propertyTitle: "villa3"
    }
    ]
  selectedproperty: any
  constructor(public orupoolService: OrupoolService, public router: Router, public activeroute: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.activeroute.snapshot.paramMap.get("id")
    console.log("edit booking id", this.id)

    if (this.id) {
      this.orupoolService.getEditFormData(this.id).subscribe(res => {
        console.log(res)
        this.formValue = res
        this.editData()
      })

    }

    this.bookingFormData = new FormGroup({
      'name': new FormControl(null),
      'dob': new FormControl(null),
      'email': new FormControl(null),
      'phoneNo': new FormControl(null),
      'bookingAmount': new FormControl(null),
      'bookingAdvance': new FormControl(null),
      'numberAdults': new FormControl(null),
      'numberChild': new FormControl(null),
      'bookingRemark': new FormControl(null),
      'dateCheckin': new FormControl(null),
      'dateCheckout': new FormControl(null),
      'timeCheckout': new FormControl(null),
      'typeBooking': new FormControl(null),
      'propertyId': new FormControl(null)
    })
  }

  editData() {
    console.log("edit")
    this.selectedproperty = {
      propertyId: this.formValue.propertyId,
      propertyTitle: this.formValue.propertyTitle
    }
    this.bookingFormData = new FormGroup({
      'name': new FormControl(this.formValue.name),
      'dob': new FormControl(this.formValue.dob),
      'email': new FormControl(this.formValue.email),
      'phoneNo': new FormControl(this.formValue.phoneNo),
      'bookingAmount': new FormControl(this.formValue.bookingAmount),
      'bookingAdvance': new FormControl(this.formValue.bookingAdvance),
      'numberAdults': new FormControl(this.formValue.numberAdults),
      'numberChild': new FormControl(this.formValue.numberChild),
      'bookingRemark': new FormControl(this.formValue.bookingRemark),
      'dateCheckin': new FormControl(this.formValue.dateCheckin),
      'dateCheckout': new FormControl(this.formValue.dateCheckout),
      'timeCheckout': new FormControl(this.formValue.timeCheckout),
      'typeBooking': new FormControl(this.formValue.typeBooking),
      'propertyId': new FormControl(this.formValue.propertyId)

    })
  }
  onSubmit() {
    this.eachDate()
    this.bookingFormData.value.uniqueId = new Date().valueOf().toString()
    this.bookingFormData.value.timestamp = firebase.firestore.FieldValue.serverTimestamp()

    this.bookingFormData.value.bookedDates = this.array

    this.bookingFormData.value.propertyTitle = this.property[this.bookingFormData.value.propertyId].propertyTitle

    /* delete this.bookingFormData.value.property */
    console.log("Booking Form", this.bookingFormData.value)
    if (this.id) {
      this.orupoolService.updateBookingData(this.bookingFormData.value, this.id)
    }
    else {
      this.bookingFormData.value.status = "false"
      this.orupoolService.addBookingData(this.bookingFormData.value)
    }

    this.bookingFormData.reset()
    this.router.navigateByUrl('home/booking-detail')
  }
  eachDate() {
    var from = this.bookingFormData.value.dateCheckin;
    var to: any = this.bookingFormData.value.dateCheckout;
    var date1 = new Date(from);
    var date2 = new Date(to);
    console.log(to)
    console.log("form to", from, to)
    for (var day = date1; day < date2; day.setDate(day.getDate() + 1)) {
      this.docdate = day.getFullYear().toString() + '-' +
        (((day.getMonth() + 1).toString().length == 1) ? '0' + (day.getMonth() + 1).toString() : (day.getMonth() + 1).toString()) + '-' +
        ((day.getDate().toString().length == 1) ? '0' + (day.getDate()).toString() : (day.getDate()).toString())

      console.log("ee")
      console.log("loop", this.docdate)

      this.array.push(this.docdate)
      console.log("loop", this.array)
    }
    /* this.bookingFormData.value.formto = array */
  }


}