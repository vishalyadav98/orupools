import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { OrupoolService } from 'src/app/service/orupool.service';

@Component({
  selector: 'app-user-booking-detail',
  templateUrl: './user-booking-detail.component.html',
  styleUrls: ['./user-booking-detail.component.scss']
})
export class UserBookingDetailComponent implements OnInit, AfterViewInit {

  userBookingData: any = []
  id: any

  constructor(public orupoolService: OrupoolService, public activeroute: ActivatedRoute,
    public firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.id = this.activeroute.snapshot.paramMap.get("id")
    console.log(this.id)

    
    this.firestore.collection('booking-data').doc(this.id).valueChanges().subscribe(res => {
      this.userBookingData = res
      console.log(res)
    })
  }

  ngAfterViewInit() {
  }


}
