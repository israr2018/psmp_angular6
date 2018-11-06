import { Injectable } from '@angular/core';
import { Router,Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './services/login.service';
import { Observable } from 'rxjs';

@Injectable()
export class AGSchoolAdmin implements CanActivate {

    constructor(private _loginService:LoginService,private router:Router){

    }
     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
       if(this._loginService.isLoggedin()){

        return true;
       }
       else{
            this.router.navigate(['/login']);
           return false;
       }
    }
    
}
