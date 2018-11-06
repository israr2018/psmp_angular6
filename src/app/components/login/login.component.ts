import { Component, OnInit } from '@angular/core';
import { LoginEntity } from './../../entities/login.entity';
import { SchoolService } from './../../services/school.service';
import { Router } from '@angular/router';
import { ISchoolEntity } from './../../entities/ischool.entity';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

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
      
        this._schoolService.login(this.entity).subscribe(result=>{
                let serviceRes=<any>result.body;
                switch(serviceRes.status_code){
                case 200:
                let school:any=<any> serviceRes.data;
                
                 switch(school.user_role){
                    case 'school_admin':
                    if(school.is_activated)
                    {
                        localStorage.setItem('token',serviceRes.token);
                        this.router.navigate(['/school_admin']);
                       
                    }
                    else
                    {
                        localStorage.setItem('token',serviceRes.token);
                        this.router.navigate(['/inactive_school']);
                        
                    }
                    break;
                    case  'portal_admin':
                    localStorage.setItem('token',serviceRes.token);
                    this.router.navigate(['/portal_admin']);
                    break;

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
            console.log("error in school login"+JSON.stringify(err));
            this.errMessage=err.message;
            });
    }
    gotoHome():void{
        this.router.navigate(['/home']);
    }
}
