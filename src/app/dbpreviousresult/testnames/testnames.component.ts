import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/shared/patient.service';
import { PreviousResult } from './../../shared/patient.model';

@Component({
  selector: 'app-testnames',
  templateUrl: './testnames.component.html',
  styleUrls: ['./testnames.component.css']
})
export class TestnamesComponent implements OnInit {
  PreviousResult : PreviousResult[];
  constructor(public patientservice: PatientService) { 
    this.PreviousResult= [];
  }

  ngOnInit() {
    var patientno =  localStorage.getItem("lspatientno");
    this.patientservice.AllTestName(patientno);
  }

  loadTestDetail(testcode) {
     var patientno =  localStorage.getItem("lspatientno");
      this.patientservice.AllLabNos(patientno,testcode);
      this.patientservice.PreviousResults(patientno,testcode);
  }

}
