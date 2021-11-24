import { ResultchartComponent } from './../../resultchart/resultchart.component';
import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/shared/patient.service';
import { AllLabNo } from './../../shared/patient.model';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-result-analysis',
  templateUrl: './result-analysis.component.html',
  styleUrls: ['./result-analysis.component.css']
})
export class ResultAnalysisComponent implements OnInit {

  AllLabNo : AllLabNo[];
  constructor(public patientservice: PatientService,
    public dialog : MatDialog) { 
    this.AllLabNo=[];
  }

  ngOnInit() {
    var patientno =  localStorage.getItem("lspatientno");
    this.patientservice.AllLabNos(patientno,"0");
    this.patientservice.PreviousResults(patientno,"0");
  }

  loadChartResult(parametercode) {
    const dialogconfig = new MatDialogConfig();
    dialogconfig.autoFocus= true;
    //dialogconfig.disableClose=true;
//    dialogconfig.width="50%";
    dialogconfig.data= {parametercode}
    this.dialog.open(ResultchartComponent,dialogconfig);
  }

}
