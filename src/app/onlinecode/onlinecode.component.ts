import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientService } from './../shared/patient.service';

@Component({
  selector: 'app-onlinecode',
  templateUrl: './onlinecode.component.html',
  styleUrls: ['./onlinecode.component.css']
})
export class OnlinecodeComponent implements OnInit {
msgsent :boolean = false;
isLoginError :boolean = false;
  constructor(private PatientService: PatientService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  OnSubmit(userName){
    this.PatientService.GetOnlineCOde(userName).then(Response => {
      console.log(Response);
      if (Response != 0)
      {
        this.msgsent = true;
        this.isLoginError = false;
      }
      else
      {
        this.isLoginError = true;
        this.msgsent = false;
      }
    });  
 }

 goback()
 {
  this.router.navigate(['/login']);
 }

 
}
