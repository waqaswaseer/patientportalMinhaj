import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PatientService } from 'src/app/shared/patient.service';

@Component({
  selector: 'app-resultchart',
  templateUrl: './resultchart.component.html',
  styleUrls: ['./resultchart.component.css']
})
export class ResultchartComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ResultchartComponent>,
    public patientservice: PatientService) { }

  ngOnInit() {
    var patientno =  localStorage.getItem("lspatientno");
    this.patientservice.SingleTestResults(patientno,this.data.parametercode);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
