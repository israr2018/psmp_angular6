import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { SchoolAdminComponent } from './../school.admin';
import { StudentReg } from './../../../entities/student.reg.entity';

@Component({
    
    templateUrl: './student.reg.html'
    
})
export class StudentRegComponent implements OnInit  {
    class_level:string="";
    school_id:string="";
    showStudentReg:boolean=false;
    isDataLoaded:boolean=false;
    entity:StudentReg=new StudentReg();
    studentList:any[]=[];
    todayDate:string;
    currentYear:Number;
    month:number;
    day:number
    ngOnInit(): void {
          this.route.paramMap.subscribe(params=>{
          this.class_level=<string>params.get('class_level');
          console.log("class level",this.class_level);
        
          this.todayDate=new Date().toISOString().split('T')[0]; 
          this.month=+this.todayDate.split('-')[1]-1
          this.day=+this.todayDate.split('-')[2];this.isDataLoaded=true;
          this.school_id=this._schoolAdminComp.school_id;
        this.getAllStudents();
          this.resetPage();
        });
      
    }
    constructor(private _schoolService:SchoolService,private route:ActivatedRoute,private _schoolAdminComp:SchoolAdminComponent){
     
    }
    
    getAllStudents(school_id?:string,class_id?:string):void{
       
        this._schoolService.getStudents(this._schoolAdminComp.school_id,this.class_level).subscribe(result=>{
            if(result.status==200){
                this.studentList=<any>result.body;
                console.log(this.studentList);
                
            }
        },
            error=>{
                console.log(error);
            }
        
        )
    }
    toggleAddNewStudent():void{
        
        console.log("toggleAddNewStudent");
        this.showStudentReg=!this.showStudentReg;
    }
    addStudent():void{
      
        //2018-08-31T
      let strSession:number=+new Date().toISOString().split('T')[0].split('-')[0];
      this.entity.session_start=strSession;
     
        this.entity.school_id=this.school_id;
        this.entity.class_level=this.class_level;
        this._schoolService.addStudent(this.entity).subscribe(result=>{
            if(result.status==201){
                this.studentList.push(result.body);
                this.entity=new StudentReg();
                this.toggleAddNewStudent();
            }
        },error=>{

        });
    }
    resetPage():void{
        this.showStudentReg=false;
    }
}
