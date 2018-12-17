import { Injectable } from '@angular/core';
import {Http,Response, RequestOptions} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { window } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
constructor(private _router:Router){
}

isLoggedin():boolean{

    var token=this.getToken();
        if(token){
            // check if token is expired
          //  var payload = JSON.parse(atob(token.split('.')[1]));
          //  return payload.exp > Date.now() / 1000;
          return true;
        }
        else{
         return false;
        }

 }
getToken():String{
return  localStorage.getItem("token");

}
currentUser():any{
    if(this.isLoggedin())
    {
        var token = this.getToken();
       
        var payload = JSON.parse(atob(token.split('.')[1]));
      /*   "_id": school._id,
        "school_name":school.school_name,
        "user_role": school.uers_role */
        return {
        _id : payload._id,
        user_role : payload.user_role,
        school_name:payload.school_name
        };
    }

}
getSchoolId():any{
let school=this.currentUser();
 return school.school_id;
}
isAdmin():boolean{
    if(this.isLoggedin())
   {
      var userData=this.currentUser();
      if(userData.user_role==='admin')
      {
       return true;
      }
   }
  return false;
}
logout():void{
  localStorage.removeItem("token");
  this._router.navigate(['/home']);

}

}
