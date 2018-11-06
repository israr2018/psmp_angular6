import { Injectable } from '@angular/core';
import {Http,Response, RequestOptions} from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { window } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse,HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
@Injectable()
export class AutoPaperService {
    baseUrl:string="http://localhost:8000/api/test/test";
constructor(private _router:Router,private http:HttpClient){
}

generatePaper(model:any){
    return this.http.post<HttpResponse<any>>(this.baseUrl,model,{observe:'response'}).pipe(
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
        `body was: ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

}
