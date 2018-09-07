import { Component, OnInit } from '@angular/core';
import { LoginEntity } from './../../entities/login.entity';
import { SchoolService } from './../../services/school.service';
import { Router } from '@angular/router';
import { ISchoolEntity } from './../../entities/ischool.entity';

@Component({
    
    templateUrl: './login.component.html'
    
})
export class LoginComponent implements OnInit {

    constructor(private _schoolService:SchoolService,private router:Router) { 

    }
    entity:LoginEntity=new LoginEntity();
    errMessage:any;
    ngOnInit(): void { }
    submit():void{
        console.log(".........submit..........");
        this._schoolService.login(this.entity).subscribe(res=>{
           // console.log(res.body.school_name);
        
            switch(res.status){
                case 200:
                console.log(res.status);
                let school:any=<any> res.body;
                 if(school.is_activated){
                    this.router.navigate(['/school_admin',school._id]);
                 }
                 else{
                     this.router.navigate(['/inactive_school']);
                 }
                 break;
                 case 404:
                 this.errMessage="Invalid user name or password";
                 break;
                 case 500:
                 this.errMessage="Internal Server Error";
                 break;
            }
            
        },err=>{
            this.errMessage=err;
        });
    }
    gotoHome():void{
        this.router.navigate(['/home']);
    }
}
