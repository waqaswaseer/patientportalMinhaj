import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/shared/patient.service';

@Component({
  selector: 'app-tophead',
  templateUrl: './tophead.component.html',
  styleUrls: ['./tophead.component.css']
})
export class TopheadComponent implements OnInit {

  constructor(private router: Router, private patientservice: PatientService) { }

  ngOnInit(): void {

    console.log(this.patientservice.userloging);
    console.log(this.loginchk);
    console.log(this.pname);
  }

  get loginchk(): any {
    return localStorage.getItem('lspatientno');
}

get pname(): any {
  return localStorage.getItem('lspname');
}

get page(): any {
  return localStorage.getItem('lsage');
}

get paddress(): any {
  return localStorage.getItem('lsaddress');
}

get pmobileno(): any {
  return localStorage.getItem('lsmobileno');
}

get pgender(): any {
  return localStorage.getItem('lsgendername');
}

pvisits(){
  this.router.navigate(['allvisit']);
}

testwiseresults(){
  this.router.navigate(['result-analysis']);
}
testbooking(){
  this.router.navigate(['test-booking']);
}

homepage(){
  this.router.navigate(['home']);
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


}
