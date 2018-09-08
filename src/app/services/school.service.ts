import { Injectable } from '@angular/core';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { school_entity } from './../entities/school_entity';
import { Observable, observable, throwError } from 'rxjs';
import { ISchoolEntity } from '../entities/ischool.entity';
import { SchoolEntity } from '../entities/school.entity';
import { catchError } from 'rxjs/operators';
import { LoginEntity } from './../entities/login.entity';
import { HttpResponse } from '@angular/common/http';
import { Class } from './../entities/class.entity';
import { StudentReg } from './../entities/student.reg.entity';

import { environment } from './../../environments/environment.staging';

@Injectable()
export class SchoolService{
   baseUrl:String
constructor(private http:HttpClient) {
  this.baseUrl=environment.baseUrl;
}
getSchoolById(school_id: string): Observable<ISchoolEntity> {
  return this.http.get<ISchoolEntity>(this.baseUrl+"/schools/"+school_id).pipe(
    catchError(this.handleError)
  );
}
getAllSchools (): Observable<ISchoolEntity[]> {
  return this.http.get<ISchoolEntity[]>(this.baseUrl+"/schools").pipe(
    catchError(this.handleError)
  );
}
/** POST: add a new hero to the server */
addSchool (entity: SchoolEntity): Observable<school_entity> {
   return this.http.post<ISchoolEntity>(this.baseUrl+"/schools", entity).pipe(
   catchError(this.handleError)
   ); 
}
login(entity:LoginEntity){
  return this.http.post<HttpResponse<any>>(this.baseUrl+"/schools/login", entity,{ observe: 'response' }).pipe(
    catchError(this.handleError)
    ); 
}
addAClass(entity:Class){
  return this.http.post<HttpResponse<Class>>(this.baseUrl+"/Classes", entity,{observe:'response'}).pipe(
    catchError(this.handleError)
    ); 
}
getClassesBySchool(school_id:string){
  return this.http.get<HttpResponse<Class>>(this.baseUrl+"/Classes/"+school_id,{observe:'response'}).pipe(
    catchError(this.handleError)
    ); 
}
getStudents(school_id:string,class_id:string){
  return this.http.get<HttpResponse<StudentReg>>(this.baseUrl+"/students/"+school_id+"/"+class_id,{observe:'response'}).pipe(
    catchError(this.handleError)
    ); 
}
addStudent(entity:StudentReg){
  return this.http.post<HttpResponse<StudentReg>>(this.baseUrl+"/students/",entity,{observe:'response'}).pipe(
    catchError(this.handleError)
    ); 
}
updateStudent(id:string,student:StudentReg){
  
  return this.http.put<HttpResponse<StudentReg>>(this.baseUrl+"/students/"+id,student,{observe:'response'}).pipe(
    catchError(this.handleError)
    ); 
}
markAttendence(attendence:any){
  return this.http.post<HttpResponse<any>>(this.baseUrl+"/attendence/mark_attendence",attendence,{observe:'response'}).pipe(
    catchError(this.handleError)
    );
}
getAttendenceByDate(date:string){
  return this.http.get<HttpResponse<any>>(this.baseUrl+"/attendence/"+date,{observe:'response'}).pipe(
    catchError(this.handleError)
    );
}
private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } 
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
        console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };
}
