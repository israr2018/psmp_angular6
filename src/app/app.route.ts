import{Routes} from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { Component } from '@angular/core';
import { SchoolAdminComponent } from './components/school.admin/school.admin';
import { InactiveSchoolComponent } from './components/school.admin/inactive.school';
import { NewClassRegComponent } from './components/school.admin/new.class.reg/new.class.reg';

import { StudentRegComponent } from './components/school.admin/student.reg/student.reg';
import { WelcomeComponent } from './components/school.admin/welcome/welcome';
import { MarkAttendenceComponent } from './components/school.admin/mark.attendence/mark.attendence';
import { ViewAttendenceComponent } from './components/school.admin/view.attendence/view.attendence';
import { AGSchoolAdmin } from './ag_school_admin';
import { AutoPaperGenComponent } from './components/auto_paper_gen/auto.paper.gen';
export const ROUTE: Routes = [
    
    { path: "home", component: HomeComponent },
    { path: "", component: HomeComponent },
    // { path: "auto_paper_gen", component: AutoPaperGenComponent },
   
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path:"inactive_school",component:InactiveSchoolComponent},
    {
      path: "school_admin",
      component: SchoolAdminComponent,
      canActivate:[AGSchoolAdmin],
      children: [
        
        { path: "student_reg/:class_level", component: StudentRegComponent },
        { path: "new_class_reg", component: NewClassRegComponent },
        { path: "mark_attendence/:class_level", component: MarkAttendenceComponent },
        { path: "view_attendence/:class_level", component: ViewAttendenceComponent },
        { path: "", component: WelcomeComponent }
      
      ]
      
    },
    
  ];