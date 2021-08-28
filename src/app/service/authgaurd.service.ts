import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OrupoolService } from './orupool.service';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService implements CanActivate {

  constructor(public orupoolService:OrupoolService,private router: Router) { }

  canActivate(): any {
    
    if(localStorage.getItem("adminUid")){
      console.log("True")
      
      return true;
    }
    else{
      console.log("False")
      this.router.navigateByUrl('')
      return false;
      
    }


  }
}
