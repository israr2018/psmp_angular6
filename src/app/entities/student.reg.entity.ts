

export class StudentReg {
 public _id?: string;
 public  school_id: string;
 public  class_level: string;
 public  student_name: string;
 public  father_name: string;
 public  gardian_name: string;
 public  student_mobile: string;
 public  gardian_mobile: string;
 public dob:Date;
 public post_address:string;
 public session_start:number;
 public attendence:any[];
  constructor() {
     this.student_name="";
     this.father_name="";
     this.gardian_name="";
     this.student_mobile="";
     this.gardian_mobile="";
     
 }
}