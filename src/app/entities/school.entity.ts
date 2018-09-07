

import { ISchoolEntity } from './ischool.entity';

export class SchoolEntity implements ISchoolEntity {
public school_name:string;
public user_name:string;
public user_password:string;
public is_activated:boolean;
public user_email:string;
user_mobile:string;
constructor() {
    this.school_name="";
    this.user_email="";
    this.user_password="";
    this.user_mobile="";
    
}

}
