import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { OrupoolService } from 'src/app/service/orupool.service';
declare var $: any;
@Component({
  selector: 'app-calender-view',
  templateUrl: './calender-view.component.html',
  styleUrls: ['./calender-view.component.scss']
})
export class CalenderViewComponent implements OnInit {

  bookData: any = []
  calendarOptions: any;
  bookingElement: any = [];
  bookingElementDate: any = [];
  data: any = []
  propertyid: any
  openmodal: boolean = false
  modalData: any = [];
  eventarray: any = []
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
  constructor(public orupoolService: OrupoolService, public router: Router, public activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.propertyid = this.activeroute.snapshot.paramMap.get("id")
    console.log("property id", this.propertyid)
    if (this.propertyid) {
      this.orupoolService.getBookingByProperty(this.propertyid).subscribe(res => {
        this.bookData = res
        console.log(res)
        this.calenderDate()
      })
    }
    else {
      this.orupoolService.getCalenderBooking().subscribe(res => {
        this.bookData = res
        this.calenderDate()
      })
    }

  }
  handleDateClick(arg: any) {
    /*  alert('date click! ' + arg.dateStr) */
    this.openmodal = true
    let date = arg.dateStr.toString();
    let data = this.bookingElementDate.filter((el: any) => el.date === date)
    console.log(data)
    this.modalData = data
  }

  calender(data: any) {
    console.log("calender", data)
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      events: data,
      eventColor: '#378006'
    };
  }

  calenderDate() {
    this.bookingElementDate = []
    console.log(this.bookData, "all bookigns")
    this.bookData.forEach((element: any) => {
      console.log(element, "booking single")
      element.bookedDates.forEach((ele: any) => {
        console.log(ele, "datae single")
        let eventstring = "Name:" + element.name + '\n' + "Property Title:" + element.propertyTitle
        this.bookingElementDate.push({ title: eventstring, date: ele })
      });
    });
    console.log(this.bookingElementDate, "temparry of devents")
    this.calender(this.bookingElementDate)
  }
  
}
