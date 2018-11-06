import {
  Component,
  OnInit
} from '@angular/core';
import {
  SchoolService
} from './../../../services/school.service';

import { SchoolAdminComponent } from 'src/app/components/school.admin/school.admin';
import { ActivatedRoute, Router } from '@angular/router';
  
@Component({

  templateUrl: './mark.attendence.html'

})
export class MarkAttendenceComponent implements OnInit {
  constructor(private _schoolService: SchoolService,private _schoolAdminComp:SchoolAdminComponent,private route:ActivatedRoute,private router:Router) {}
  studentList: any[] = [];
  class_level:string;
  school_id:string;
  isDataAvailable:boolean;
  todayDate: string;
  currentYear: string;
  currentDate:string;
  month: number;
  day: number;
  map = new Map();
  isAttendenceSaved:boolean=false;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.class_level=<string>params.get('class_level');
      this.todayDate=new Date().toISOString().split('T')[0]; 
      this.currentDate=this.todayDate;
      this.month=+this.todayDate.split('-')[1]-1
      this.day=+this.todayDate.split('-')[2];
      this.isDataAvailable=true;
      this.school_id=this._schoolAdminComp.school_id;
      this.isAttendenceSaved=false;
      this.getAllStudentsByClass();
     // this.resetPage();
    });   
  }
  markAttendence(status, student): void {
    this.map.set(student._id,{"status":status,
                              "date":this.currentDate,
                              "student_id":student._id}
  );
  
  }
  getAllStudentsByClass():void{
        
    this._schoolService.getStudents(this._schoolAdminComp.school_id,this.class_level).subscribe(result=>{
        this.studentList=<any>result.body;
       
       this.isDataAvailable=true;
        
   },error=>{

   });
}
 saveAttendence():void{
   console.log(this.currentDate);
   
    this.map.forEach(x=>{
      console.log(x)
      this._schoolService.markAttendence(x).subscribe(result=>{},error=>{});
    });
    this.saveClassStatus();
    this.reloadRegisterClasses();
 }
 reloadRegisterClasses():void{
  this._schoolService.getClassesBySchool(this.school_id).subscribe(
    x=>{
      this._schoolAdminComp.regClasses=<any>x.body;
      console.log("this._schoolAdminComp.regClasses"+this._schoolAdminComp.regClasses);
      this.isAttendenceSaved=true;
    },
    error=>{
      console.log("error in getCalssesBySchool");
    }
  );
 }
 saveClassStatus():void{
   this._schoolService.classAttendenceRecorded(this.school_id,this.class_level).subscribe(
    result=>{
      console.log("resulte:successs");
      
    },error=>{
      console.log("something goes wrong "+error);
    }
   );
   // update link on the left side
   
 }
 gotoHome():void{
   this.router.navigate(['/school_admin',this.school_id]);
 }
}
