import { Patient } from './../../shared/patient.model';
import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/shared/patient.service';

@Component({
  selector: 'app-patientinfo',
  templateUrl: './patientinfo.component.html',
  styleUrls: ['./patientinfo.component.css']
})
export class PatientinfoComponent implements OnInit {
  userClaims: any;
  message: string;
  constructor(public patientservice: PatientService) { }

  ngOnInit() {
    
    this.patientservice.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
      sessionStorage.setItem('patientno',this.userClaims.patientno);
    });

    

    //this.patientservice.currentMessage.subscribe(message => this.message = message)
  }
}
