import {
  Component,
  OnInit
} from '@angular/core';
import {
  SchoolService
} from './../../../services/school.service';
import {
  StudentReg
} from './../../../entities/student.reg.entity';

@Component({

  templateUrl: './mark.attendence.html'

})
export class MarkAttendenceComponent implements OnInit {
  constructor(private _schoolService: SchoolService) {}
  studentList: StudentReg[] = [];
  todayDate: Date;
  currentYear: string;
  currentDate:string;
  month: number;
  day: number;
   map = new Map();
  ngOnInit(): void {
    this._schoolService.getStudents("5b7d30a966cec178ff5a0c20", "5b827e4f1102bc0b64067ba6").subscribe(result => {
      this.studentList = < any > result.body;
      this.todayDate = new Date();
      this.currentDate=new Date().toISOString().split('T')[0];
      this.currentYear = new Date().toISOString().split('T')[0].split('-')[0];
      console.log("mark attendence", this.studentList);
      this.month = +new Date().toISOString().split('T')[0].split('-')[1] - 1;
      this.day = +new Date().toISOString().split('T')[0].split('-')[2];
    }, error => {

    });
  }
  markAttendence(status, student): void {
    this.map.set(student._id,{"status":status,
                              "date":this.currentDate,
                              "student_id":student._id}
  );
  
  }
 saveAttendence():void{
   console.log(this.currentDate);
   
    this.map.forEach(x=>{
      console.log(x)
      this._schoolService.markAttendence(x).subscribe(result=>{},error=>{});
    });
    
 }
}
