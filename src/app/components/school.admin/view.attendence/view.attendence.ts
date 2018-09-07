import { Component, OnInit } from '@angular/core';
import { StudentReg } from '../../../entities/student.reg.entity';
import { SchoolService } from './../../../services/school.service';

@Component({
   
    templateUrl: './view.attendence.html',
    
})
export class ViewAttendenceComponent implements OnInit {
    studentList:any[]=[];
    todayDate:string;
    month:number;
    day:any=30;
    index:number=0;
    isDataAvailable:boolean=false;
    flagShowAttendence:number=-1;
    map=new Map();
    constructor(private _schoolService:SchoolService) { }

    ngOnInit(): void {
            this.getAllStudentsByClass();
            this.todayDate=new Date().toISOString().split('T')[0]; 
            this.month=+this.todayDate.split('-')[1]-1
            this.day=+this.todayDate.split('-')[2];

            console.log(this.todayDate);
            console.log(this.month);
            console.log(this.day);
            this.getAttendenceByDate(this.todayDate);
            this.isDataAvailable=true;
            
     }
     getAllStudentsByClass():void{
        this._schoolService.getStudents("5b7d30a966cec178ff5a0c20","5b827e4f1102bc0b64067ba6").subscribe(result=>{
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
       
       // this.map.set("5b8819555f427b11f4f9f8d7",{"date":"2018-09-03","status":"P","student_id":""});
       // this.map.set("5b8819895f427b11f4f9f8d8",{"date":"2018-09-03","status":"P","student_id":""});
       // console.log(this.map.get("")==undefined);
       
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