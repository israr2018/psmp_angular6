import { Component, OnInit, ViewChild } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { Class } from './../../entities/class.entity';
import { StudentRegComponent } from './student.reg/student.reg';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
   
    templateUrl: './school.admin.html'
    
})
export class SchoolAdminComponent implements OnInit {
    
    private studentRegComp:StudentRegComponent;
    constructor(private _schoolService:SchoolService,private route:ActivatedRoute) {

     }
    showStudentReg:boolean=false;
    showMarkAttendence:boolean=false;
    showViewAttendence:boolean=false;
    showAddNewClass:boolean=false;
    regClasses:Class[]=[];
    school_id:string="";
    school_name:string="test";
    isDataAvailable:boolean=false;
    ngOnInit(): void { 
       this.route.paramMap.subscribe(x=>{
        this.school_id=x.get('school_id');
        this.getSchoolById(this.school_id);
        this.getClassesBySchoolId();
       });
        
    }
    getSchoolById(school_id:string){
        this._schoolService.getSchoolById(school_id).subscribe(result=>{
            this.school_name=result.school_name;
            //console.log("school_name",result);
        },error=>{});
    }
    getClassesBySchoolId():void{
        
        this._schoolService.getClassesBySchool(this.school_id).subscribe(result=>{
            this.regClasses=<any>result.body;
            console.log("reg classes",this.regClasses);
            this.isDataAvailable=true;
        },
            error=>{}
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
