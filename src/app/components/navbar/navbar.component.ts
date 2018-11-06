import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styles: [`.router-link-active { background-color: white; }`]
    
})
export class NavbarComponent implements OnInit {
    constructor(private _loginService:LoginService) { }

    ngOnInit(): void { 
        
    }
    isLoggedin():boolean{
        return this._loginService.isLoggedin();
     
       }
       logout():void{

        this._loginService.logout();
      }
}
