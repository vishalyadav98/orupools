import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrupoolService } from 'src/app/service/orupool.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public orupoolService:OrupoolService,public router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("adminUid")){
      this.router.navigateByUrl('home/booking-detail');
    }
  }

  onSubmit(data:NgForm){
    console.log("login form", data.value)
    this.orupoolService.checkLoginInfo(data.value)
  }

}
