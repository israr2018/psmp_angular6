import { Component, OnInit } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import * as fs from 'fs';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import {  AutoPaperService } from './../../services/autopaper.gen.service';

@Component({
    
    templateUrl: './auto.paper.gen.html',
    styleUrls: ['./auto.paper.gen.css']
})
export class AutoPaperGenComponent implements OnInit {
    viewMode:String="tab1";
    pdfSrc: string = 'http://localhost:8000/uploads/File1.pdf';
     
    constructor(private autoPaperService:AutoPaperService) { }

    ngOnInit(): void {

     }
setViewMode(mode:String){
    console.log("mode",mode);
    var model={
        "school_name":"Smart Public School",
        "class":"IX",
        "subject":"mathematics",
        "exam_type":"Half Yearly Examination",
        "session":"2018-2019",
        "group":"Science"
    }
    this.autoPaperService.generatePaper(model).subscribe(res=>{
        this.viewMode=mode;
    },error=>{});

}
}
