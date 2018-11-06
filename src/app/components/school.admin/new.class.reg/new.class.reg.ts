import { Component, OnInit } from '@angular/core';
import { Class } from '../../../entities/class.entity';
import { SchoolService } from './../../../services/school.service';
import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { templateJitUrl } from '@angular/compiler';
import { SchoolAdminComponent } from './../school.admin';

@Component({
    
    templateUrl: './new.class.reg.html',
    
})
export class NewClassRegComponent implements OnInit {
    constructor(private _schoolService:SchoolService,private _schoolAdminComp:SchoolAdminComponent) { }
    showAddNewClass:boolean=false;
    entity:Class=new Class();
    availableClasses:string[]=["KG","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
    regClasses:any[]=[];
    tempList:string[]=[];
   
    ngOnInit(): void { 
        /* this._schoolService.getClassesBySchool(this.school_id).subscribe(result=>{
             this.regClasses=<any>result.body;
            
            console.log(this.availableClasses);

        },error=>{

        }); */
        this.regClasses=this._schoolAdminComp.regClasses;
    }
    toggleAddNewClass():void{
       this.showAddNewClass=true;
       console.log(this.showAddNewClass);
    }
    btnCancel():void{
        this.showAddNewClass=false;
        
    }
    addNewClass(class_level:string,monthly_fee:string,session:string):void{
        
        this.entity.class_level=class_level;
        this.entity.Fees=monthly_fee;
        this.entity.session=session;
        this.entity.school_id=this._schoolAdminComp.school_id;
        this._schoolService.addAClass(this.entity).subscribe(result=>{
            if(result.status==201){
                this.showAddNewClass=false;
                this.regClasses.push(this.entity);
              //  this.filterClasses();
                console.log("class is added successfully.");
            }
            if(result.status==500){
                console.log("Somte thing goes wrong , please try latter");
                
            }

        },error=>{
            console.log("error:",error);
        });
    }
    filterClasses():void{
        this.tempList=[];
        this.regClasses.forEach(x=>{this.tempList.push(x.class_level)});
        console.log("tempList",this.tempList);
        this.availableClasses=  this.availableClasses.filter(x=>{return !(this.tempList.includes(x))});
    }
}
