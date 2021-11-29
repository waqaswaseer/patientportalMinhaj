import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientService } from './../shared/patient.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-onlinecode',
  templateUrl: './onlinecode.component.html',
  styleUrls: ['./onlinecode.component.css']
})
export class OnlinecodeComponent implements OnInit {
msgsent :boolean = false;
isLoginError :boolean = false;
  constructor(private PatientService: PatientService, private router: Router,private toastr: ToastrService,
    private notificationService: NotificationService, ) { }

  ngOnInit(): void {
  }

  OnSubmit(userName){
    this.PatientService.GetOnlineCOde(userName).then(Response => {
      console.log(Response);
      if (Response != 0)
      {
        this.notificationService.success('You will recieve a message soon');
        this.msgsent = true;
        this.isLoginError = false;
      }
      else
      {
        this.notificationService.success(':: We are sorry!');
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
