import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CurrentVisitData } from './../../shared/patient.model';
import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/shared/patient.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-currentvisit',
  templateUrl: './currentvisit.component.html',
  styleUrls: ['./currentvisit.component.css']
})
export class CurrentvisitComponent implements OnInit {
  show: boolean = false;
  message:string;
  CurrentVisitData : CurrentVisitData[];
  constructor(public patientservice: PatientService) { 
    this.CurrentVisitData= [];
  }

  ngOnInit() {
    // this.patientservice.currentMessage.subscribe(message => {this.message = message;
      
    // })
    //console.log(sessionStorage.getItem('spatientno'));
    var patientno =  localStorage.getItem("lspatientno");
    this.patientservice.CurrentVisitsList(patientno);
  }

  loadReport(pt: CurrentVisitData) {
    if (pt.rptstatus=="Ok")
      window.open(pt.pdfurl);
  
  }
  
}
