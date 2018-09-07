import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule} from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { ROUTE } from './app.route';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, NgForm, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SchoolService } from './services/school.service';
import { SchoolAdminComponent } from './components/school.admin/school.admin';
import { InactiveSchoolComponent } from './components/school.admin/inactive.school';

import { NewClassRegComponent } from './components/school.admin/new.class.reg/new.class.reg';
import { StudentRegComponent } from './components/school.admin/student.reg/student.reg';
import { WelcomeComponent } from './components/school.admin/welcome/welcome';
import { MarkAttendenceComponent } from './components/school.admin/mark.attendence/mark.attendence';
import { ViewAttendenceComponent } from './components/school.admin/view.attendence/view.attendence';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    SchoolAdminComponent,
    InactiveSchoolComponent,
    NewClassRegComponent,
    StudentRegComponent,
    WelcomeComponent,
    MarkAttendenceComponent,
    ViewAttendenceComponent
  ],
  imports: [
 
   BrowserModule,
   FormsModule,
   // import HttpClientModule after BrowserModule.
   
    HttpClientModule,
    
    RouterModule.forRoot(ROUTE)
  
  ],
  providers: [SchoolService],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
