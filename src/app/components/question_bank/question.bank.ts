import { Component, OnInit } from '@angular/core';

@Component({
    
    templateUrl: './question.bank.html'
    
})
export class QuestionBankComponent implements OnInit {
    addNewQuestion:boolean=false;;
    
    constructor() { }

    ngOnInit(): void { 

       this.addNewQuestion=false;
    }

    newQuestion():void{

        this.addNewQuestion=true;

    }
    saveQuestion(value?:any):void{

        console.log("value..........."+value);
        this.addNewQuestion=false;

    }
}
