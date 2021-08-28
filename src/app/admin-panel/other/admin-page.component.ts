import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrupoolService } from 'src/app/service/orupool.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(public orupoolService:OrupoolService,public router: Router,private _location: Location) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("adminUid");
    this.router.navigateByUrl('');
  }
  backClicked() {
    this._location.back();
  }
 
}
