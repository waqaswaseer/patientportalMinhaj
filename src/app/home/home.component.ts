import { PatientService } from './../shared/patient.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userClaims: any;
  constructor(private router: Router, public patientservice: PatientService) { }

  ngOnInit() {
    // this.patientservice.getUserClaims().subscribe((data: any) => {
    //   this.userClaims = data;
    // });
  }

  Logout() {
    this.patientservice.userloging='';
    localStorage.removeItem('userToken');
    localStorage.removeItem('lspname');
    localStorage.removeItem('lspatientno');
    localStorage.removeItem('lsage');
    localStorage.removeItem('lsmobileno');
    localStorage.removeItem('lsadress');
    localStorage.removeItem('lsgender');
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);

  }

  charttt(){
    this.router.navigate(['chart1']);
  }

  homepage(){
    this.router.navigate(['home']);
  }
}
