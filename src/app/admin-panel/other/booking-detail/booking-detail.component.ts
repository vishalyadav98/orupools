import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrupoolService } from 'src/app/service/orupool.service';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {

  bookData: any = []
  value: any;
  filtered = '';
  propertyid: any;
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
  constructor(public orupoolService: OrupoolService, public router: Router, public activeroute: ActivatedRoute,
    public storage: AngularFireStorage, public firestore: AngularFirestore) { }

  ngOnInit(): void {
    console.log(this.property[0].propertyId)
    console.log(this.property[1].propertyId)
    this.propertyid = this.activeroute.snapshot.paramMap.get("id")

    console.log("property id", this.propertyid)
    if (this.propertyid) {
      this.orupoolService.getBookingByProperty(this.propertyid).subscribe(res => {
        this.bookData = res
        console.log(res)
      })
    }
    else {
      this.orupoolService.getBooking().subscribe(res => {
        this.bookData = res
        console.log(res)
      })
    }

  }

  onShare(data: any) {
    console.log("copy link", data)
    /* this.value = this.router.navigate(["show-booking", data]); */
    alert("Link Copied")
    this.copyText(data)
  }

  copyText(val: string) {
    let link = environment.shareWebLink + 'show-booking/' + val
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  onDelete(id: any, imagepath: any) {
    let txt;
    if (confirm("Press Ok to confirm delete!")) {
      txt = "You pressed OK!";
      console.log(txt)
      this.orupoolService.deleteBooking(id)
      if (imagepath) {
        console.log(imagepath)
        let ref = firebase.storage().ref()
        console.log(ref)
        ref.child(imagepath).delete()
      }
    } else {
      txt = "You pressed Cancel!";
      console.log(txt)
    }
  }

  /* onEdit(id:any){
    this.orupoolService.editBooking(id)
  } */

  calendeView() {
    if (this.propertyid == 0) {
      this.router.navigateByUrl('home/calender-view/' + this.property[0].propertyId);
    }
    else if (this.propertyid == 1) {
      this.router.navigateByUrl('home/calender-view/' + this.property[1].propertyId);
    }
    else if (this.propertyid == 2) {
      this.router.navigateByUrl('home/calender-view/' + this.property[2].propertyId);
    }
  }

  bookRoute(id: any) {
    console.log(id)
    this.router.navigateByUrl('home/booking-detail/' + id);

    setTimeout(() => {
      console.log("call")
      this.ngOnInit();

    }, 1000);

  }

}
