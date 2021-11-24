import { SharedComponent } from './shared/shared.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from './shared/patient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'patientportal';
  userClaims: any;
  constructor(private router: Router, public patientservice: PatientService) { }

  ngOnInit() {
    
  }

}

