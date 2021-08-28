import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { OrupoolService } from 'src/app/service/orupool.service';

@Component({
  selector: 'app-booking-confirmed',
  templateUrl: './booking-confirmed.component.html',
  styleUrls: ['./booking-confirmed.component.scss']
})
export class BookingConfirmedComponent implements OnInit {

  id:any;
  uniqueId:any
  constructor(public activeroute:ActivatedRoute,public firestore:AngularFirestore,public orupoolService:OrupoolService) { }

  ngOnInit(): void {
    this.id = this.activeroute.snapshot.paramMap.get("id")
    console.log(this.id)
    this.orupoolService.setBookingDetail(this.id).subscribe(res => {
      console.log(res)
       
      this.uniqueId = res[0].uniqueId
      console.log(this.uniqueId)
    })
  }

}
