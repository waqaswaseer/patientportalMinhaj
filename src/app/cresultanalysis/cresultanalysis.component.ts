import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/shared/patient.service';
import { AbnormalTestResults } from '../shared/patient.model'


@Component({
  selector: 'app-cresultanalysis',
  templateUrl: './cresultanalysis.component.html',
  styleUrls: ['./cresultanalysis.component.css']
})
export class CresultanalysisComponent implements OnInit {
  AbnormalTestResults : AbnormalTestResults[];
  constructor(public patientservice: PatientService) {
    this.AbnormalTestResults = [];
   }

  ngOnInit() {
    //console.log(sessionStorage.getItem('spatientno'));
    var patientno =  localStorage.getItem("lspatientno");
    console.log(patientno);
    this.patientservice.ProfileTestResult(patientno);
    this.patientservice.SingleTestResult(patientno);
  }

}
