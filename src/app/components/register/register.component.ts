import { Component, OnInit } from '@angular/core';
import { SchoolEntity } from './../../entities/school.entity';
import { SchoolService } from './../../services/school.service';
import { Router } from '@angular/router';

@Component({
  
    templateUrl: './register.component.html',
   
})
export class RegisterComponent implements OnInit {
    entity:SchoolEntity=new SchoolEntity();
    
    constructor(private _schoolService:SchoolService,private router:Router) { 
        
    }

    ngOnInit(): void {
    
     }
     register():void{
       this. _schoolService.addSchool(this.entity).subscribe(result=>{
           
            this.router.navigate(['inactive_school']);
        },error=>{});
     }
     gotoHome():void{
        this.router.navigate(['home']);
     }

}
