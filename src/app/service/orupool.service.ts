import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrupoolService {

  todayDate:any;
  constructor(public router:Router,
    private toastr: ToastrService,
    private firestore:AngularFirestore,
    private http: HttpClient) {
 
   }

  checkLoginInfo(data:any){
    let loginEmail = data.email
    let loginPassword = data.password
    let email = environment.firebaseConfig.email;
    let password = environment.firebaseConfig.password;
    let adminuid = environment.firebaseConfig.adminUid;
    if(email == loginEmail && password == loginPassword){
      console.log("login Success")
      localStorage.setItem("adminUid",adminuid)
      console.log("adminudi",adminuid)
      this.showSuccess()
      this.router.navigateByUrl('home/calender-view/' + '0');
    }
    else{
      this.showerror()
      console.log("login Fail")
     
    }
  }

  showSuccess() {
    this.toastr.success('succesfull');
  }
  showerror() {
    this.toastr.warning('everything is broken', 'Major Error', {
      timeOut: 3000,
    });
  }

  addBookingData(data:any){
    this.firestore.collection('booking-data').add(data).then((res:any) => {
      console.log(res)    
    });
  }
  updateBookingData(data:any,id:any){
    this.firestore.collection('booking-data').doc(id).update(data).then((res:any) => {
      console.log(res)    
    });
  }

  getBooking(){
    return this.firestore.collection('booking-data',ref=>ref.orderBy("timestamp","desc")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data }; 
      }))
    );   
}

getBookingByProperty(id:any){
  return this.firestore.collection('booking-data',ref=>ref.where("propertyId", "==", id).orderBy("timestamp","desc")).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data }; 
    }))
  );   
}

deleteBooking(id:any){
  this.firestore.collection('booking-data').doc(id).delete().then(res => {
    console.log(res)    
  });
}

getEditFormData(id:any){
  return this.firestore.collection('booking-data').doc(id).snapshotChanges().pipe(
    map(actions =>  {
      const data = actions.payload.data() as any;
      const id = actions.payload.id;
      return { id, ...data }; 
    })
  );  
}

addUserBooking(id:any,data:any){
  console.log("id",id)
  this.firestore.collection('booking-data').doc(id).update(data).then((res:any) => {
    console.log(res)    
  });
}

/* showUserBooking(id:any){
  return this.firestore.collection('booking-data').doc(id).collection('user-booking').snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data }; 
    }))
  );  
} */

setBookingDetail(id:any){
  console.log("id",id)
  return this.firestore.collection('booking-data',ref => ref.where('uniqueId',"==", id)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data }; 
    }))
  ); 
}

getCalenderBooking(){
  /* this.date() */
  let data = "true"
  return this.firestore.collection('booking-data',ref => ref.where("status","==",data)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data }; 
    }))
  );   
}
date(){
  /* ,ref=>ref.where("dateBooking", "==" , this.todayDate) */
  let date = new Date();
 this.todayDate =  date.getFullYear().toString()  + '-' + '0' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString()
 console.log(this.todayDate)
}

sendSms(data:any){
  console.log(data)
  this.http.post('http://2factor.in/API/V1/d2a269fb-0169-11ec-a13b-0200cd936042/ADDON_SERVICES/SEND/TSMS',data).subscribe(res => {
    console.log(res)
  })
}
}
