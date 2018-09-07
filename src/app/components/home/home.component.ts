import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    
    templateUrl: './home.component.html'
    
})
export class HomeComponent implements OnInit {
    constructor(private router:Router) { }

    ngOnInit(): void { 

    }
    gotoRegistration():void{
        this.router.navigate(['register']);
    }
    gotoSignIn():void{
        this.router.navigate(['login']);
    }
}
