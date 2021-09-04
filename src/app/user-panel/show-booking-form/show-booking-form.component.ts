import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrupoolService } from 'src/app/service/orupool.service';
import { ToastrService } from 'ngx-toastr';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-show-booking-form',
  templateUrl: './show-booking-form.component.html',
  styleUrls: ['./show-booking-form.component.scss']
})
export class ShowBookingFormComponent implements OnInit {

  uniqueId:any;
  bookingFormData:any = FormGroup;
  formValue:any = []
  imagepath:any
  imageurl:any
  imagepathid:any
  imageurlid:any
  id:any;
  submitted:any = false;
  termsCheck:any = false;
  url:any;
  url2:any;
  isDisabled:any
  property:any = 
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
  constructor(public activeroute:ActivatedRoute,
    public firestore:AngularFirestore,
    private toastr: ToastrService,
    public storage:AngularFireStorage,
    public orupoolService:OrupoolService,
    public router:Router
    ) { }

  ngOnInit(): void {
    this.uniqueId = this.activeroute.snapshot.paramMap.get("id")
    console.log(this.uniqueId)

    this.orupoolService.setBookingDetail(this.uniqueId).subscribe(res => {
      console.log(res)
      this.id = res[0].id
      this.formValue = res[0]
      console.log("formdata",this.formValue)
    this.callForm()
    })
  }

  callForm(){
    this.bookingFormData = new FormGroup({
      'uniqueId': new FormControl(this.formValue.uniqueId),
      'name': new FormControl(this.formValue.name,[Validators.required]),
      'dob': new FormControl(this.formValue.dob,[Validators.required]),
      'email': new FormControl(this.formValue.email,[Validators.required ,Validators.email]),
      'phoneNo': new FormControl(this.formValue.phoneNo,[Validators.required]),
      'bookingAmount': new FormControl(this.formValue.bookingAmount,[Validators.required]),
      'bookingAdvance': new FormControl(this.formValue.bookingAdvance,[Validators.required]),
      'numberAdults': new FormControl(this.formValue.numberAdults,[Validators.required]),
      'numberChild': new FormControl(this.formValue.numberChild,[Validators.required]),
      'bookingRemark': new FormControl(this.formValue.bookingRemark,[Validators.required]),
      'dateCheckin': new FormControl(this.formValue.dateCheckin,[Validators.required]),
      'dateCheckout': new FormControl(this.formValue.dateCheckout,[Validators.required]),
      'timeCheckout': new FormControl(this.formValue.timeCheckout,[Validators.required]),
      'typeBooking': new FormControl(this.formValue.typeBooking,[Validators.required]),
      'propertyId': new FormControl(this.formValue.propertyId,[Validators.required]),
       'imageInput': new FormControl(null,[Validators.required]),
       'imageIdProof': new FormControl(null,[Validators.required])
    })
  }

  onSubmit(){
console.log("userfill data",this.bookingFormData.value)
this.bookingFormData.value.status = "true"
this.bookingFormData.value.imageUrl = this.imageurl
this.bookingFormData.value.imagePath =  this.imagepath
this.bookingFormData.value.imageUrlId = this.imageurlid
this.bookingFormData.value.imagePathId =  this.imagepathid
this.orupoolService.addUserBooking(this.id,this.bookingFormData.value)
let smsData = {
  From: "orupol",
  To: this.bookingFormData.value.phoneNo,
  TemplateName: "orupools",
  VAR1: this.bookingFormData.value.name,
  VAR2: this.bookingFormData.value.uniqueId,
  VAR3: this.bookingFormData.value.bookingAmount,
  VAR4: this.bookingFormData.value.bookingAdvance,
  VAR5: this.bookingFormData.value.numberAdults,
  VAR6: this.bookingFormData.value.numberChild,
  VAR7: this.bookingFormData.value.dateCheckin,
  VAR8: this.bookingFormData.value.dateCheckout
}
this.orupoolService.sendSms( smsData)
/* this.bookingFormData.reset(); */
const form = document.getElementById('formd');
 emailjs.sendForm('service_esznix9','template_9bco5cd', 'form', 'user_51BUZbwVWfMUiCTtEVWlh').then(function(response) {
  console.log('SUCCESS!', response.status, response.text);
  console.log("it is done")
 
},function(error) {
  console.log('FAILED...', error);
}); 
this.router.navigateByUrl('/booking-confirmed/' + this.uniqueId)
  }

 /*  routeTo(){
    this.router.navigateByUrl('/booking-confirmed/' + this.uniqueId)
  } */

  upload(event:any){
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event) => {
      this.url = event.target?.result;
    }
    let filepath = event.target.files[0]
   this.imagepath = '/payment-image'+ this.uniqueId
this.storage.upload(this.imagepath,filepath).then(res =>{
  console.log(res)
  this.viewImage()
})
  }

viewImage(){
  const ref = this.storage.ref(this.imagepath)
  let link = ref.getDownloadURL().subscribe(res => {
    console.log(res)
    this.imageurl = res
    console.log("image link", this.imageurl)
  }) 
}
uploadIdImage(event:any){
  var reader = new FileReader();

  reader.readAsDataURL(event.target.files[0]);

  reader.onload = (event) => {
    this.url2 = event.target?.result;
  }
  let filepath = event.target.files[0]
 this.imagepathid = '/Id-proof'+ this.uniqueId
this.storage.upload(this.imagepathid,filepath).then(res =>{
console.log(res)
this.viewImageId()
})
}
viewImageId(){
  const ref = this.storage.ref(this.imagepathid)
  let link = ref.getDownloadURL().subscribe(res => {
    console.log(res)
    this.imageurlid = res
    console.log("image link", this.imageurlid)
  }) 
}
showSuccess() {
  this.toastr.success('Submitted Successfully');
}
formSubmit(){
  this.showSuccess()
  this.submitted = true;
}
termsSelect(){
  if(this.termsCheck == false){
    this.termsCheck = true
  }
  else{
    this.termsCheck = false
  }
 
}

}
