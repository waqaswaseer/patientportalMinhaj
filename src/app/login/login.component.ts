import { Router } from '@angular/router';
import { PatientService } from './../shared/patient.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
isLoginError : boolean = false;
userClaims: any;
  constructor(private PatientService: PatientService, private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.PatientService.userloging = '';
    sessionStorage.clear();
    localStorage.clear();
  }

  
  OnSubmit(userName,password){
    sessionStorage.clear();
    localStorage.clear();
    this.PatientService.userAuthentication(userName,password).subscribe((data : any)=>{
     localStorage.setItem('userToken',data.access_token);
     this.PatientService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
      this.PatientService.userloging = this.userClaims.patientno;
      localStorage.setItem("lspatientno", this.userClaims.patientno);
      localStorage.setItem("lspname", this.userClaims.firstname);
      localStorage.setItem("lsgendername", this.userClaims.gendername);
      localStorage.setItem("lsage", this.userClaims.age);
      localStorage.setItem("lsmobileno", this.userClaims.mobileno);
      localStorage.setItem("lsaddress", this.userClaims.address1);      
      this.router.navigate(['/home']);
    });

     
     //this.toastr.success(data.access_token);
   },
   (err : HttpErrorResponse)=>{
     this.isLoginError = true;
   });
 }

 getonlinecode()
 {
  this.router.navigate(['/online']);
 }
 signup()
 {
  this.router.navigate(['/signup']);
 }
  
}
