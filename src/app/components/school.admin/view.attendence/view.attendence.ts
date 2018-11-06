import { Component, OnInit } from '@angular/core';
import { StudentReg } from '../../../entities/student.reg.entity';
import { SchoolService } from './../../../services/school.service';
import { ActivatedRoute } from '@angular/router';
import { SchoolAdminComponent } from './../school.admin';

@Component({
   
    templateUrl: './view.attendence.html',
    
})
export class ViewAttendenceComponent implements OnInit {
    studentList:any[]=[];
    class_level:string;
    school_id:string;
    isDateLoaded:boolean=false;
    todayDate:string;
    currentDate:string;
    month:number;
    day:any=30;
    index:number=0;
    isDataAvailable:boolean=false;
    flagShowAttendence:number=-1;
    map=new Map();
    constructor(private _schoolService:SchoolService,private route:ActivatedRoute,private _schoolAdminComp:SchoolAdminComponent) { }

    ngOnInit(): void {

        this.route.paramMap.subscribe(params=>{
            this.class_level=<string>params.get('class_level');
            console.log("class level",this.class_level);
          
            this.todayDate=new Date().toISOString().split('T')[0]; 
            this.currentDate=this.todayDate;
            this.month=+this.todayDate.split('-')[1]-1
            this.day=+this.todayDate.split('-')[2];
            this.isDataAvailable=true;
            this.school_id=this._schoolAdminComp.school_id;
            this.getAllStudentsByClass();
            this.getAttendenceByDate(this.currentDate);
          });   
          
     }
     getAllStudentsByClass():void{
        
        this._schoolService.getStudents(this._schoolAdminComp.school_id,this.class_level).subscribe(result=>{
            this.studentList=<any>result.body;
           
           this.isDataAvailable=true;
            
       },error=>{

       });
    }
    getAttendenceByDate(date:any):void{
       console.log("data param",date);
        this._schoolService.getAttendenceByDate(date).subscribe((result)=>{
            let list:any[]=<any>result.body;
            console.log(list);

            list.forEach( item=>{this.map.set(item.student_id,item)});
        },error=>{

        });
       
    }
  
    getAttendenceByDate2(date:any):void{
        console.log("data param",date.value);
         this._schoolService.getAttendenceByDate(date.value).subscribe((result)=>{
             let list:any[]=<any>result.body;
             console.log(list);
             // clear the map
             this.map=new Map();
             list.forEach( item=>{this.map.set(item.student_id,item)});
             
             this.studentList.reverse();
            
         },error=>{
 
         });
        
     }
    
    }