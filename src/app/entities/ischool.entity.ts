 
export interface ISchoolEntity {
  _id?: string;
  school_name: string;
  user_name: string;
  user_email: string;

  user_mobile: string;
  user_role?: string;
  user_password: string;
  
  is_activated?: boolean;
  
}