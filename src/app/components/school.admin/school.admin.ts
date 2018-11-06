import { Component, OnInit, ViewChild } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { Class } from './../../entities/class.entity';
import { StudentRegComponent } from './student.reg/student.reg';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { LoginService } from './../../services/login.service';

@Component({
   
    templateUrl: './school.admin.html'
    
})
export class SchoolAdminComponent implements OnInit {
    
    private studentRegComp:StudentRegComponent;
    constructor(private _schoolService:SchoolService,private route:ActivatedRoute,private _loginService:LoginService) {

     }
    showStudentReg:boolean=false;
    showMarkAttendence:boolean=false;
    showViewAttendence:boolean=false;
    showAddNewClass:boolean=false;
    regClasses:Class[]=[];
    school_id:string="";
    school_name:string="test";
    isDataAvailable:boolean=false;
    todayDate:string;
    ngOnInit(): void { 
        this.todayDate=new Date().toISOString().split('T')[0];
            const school=this._loginService.currentUser();
           // console.log("school==="+school);
            this.school_id=school._id;
            this.school_name=school.school_name; 
            this.getSchoolById(this.school_id);
            this.getClassesBySchoolId();
            this.todayDate=new Date().toISOString().split('T')[0];
    //    this.route.paramMap.subscribe(x=>{
    //     this.school_id=x.get('school_id');
    //     this.todayDate=new Date().toISOString().split('T')[0];
    //     this.getSchoolById(this.school_id);
    //     this.getClassesBySchoolId();
    //     let school=this._loginService.currentUser();
    //     this.school_id=school._id;
    //     this.school_name=school.school_name;
        
    //    });
        
    }
    getSchoolById(school_id:string){
        this._schoolService.getSchoolById(school_id).subscribe(result=>{
            this.school_name=result.school_name;
            //console.log("school_name",result);
        },error=>{});
    }
    getClassesBySchoolId():void{
            console.log("school_id  ",this.school_id);
            this._schoolService.getClassesBySchool(this.school_id).subscribe(result=>{
            this.regClasses=<any>result.body;
            console.log("reg classes",this.regClasses);
            this.isDataAvailable=true;
        },
            error=>{
                console.log("something goes wrong ${error}");
            }
        );
    }
    toggleStudentReg():void{
       
        this.showStudentReg=!this.showStudentReg
        
    }

    toggleMarkAttendence():void{
        
        this.showMarkAttendence=!this.showMarkAttendence;
        
    }
    toggleViewAttendence():void{
        
        this.showViewAttendence=!this.showViewAttendence;
        
    }
    
}
