import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
import { Labtests, PendingBasket, usersignup } from '../shared/patient.model';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-patientbucket',
  templateUrl: './patientbucket.component.html',
  styleUrls: ['./patientbucket.component.css']
})
export class PatientbucketComponent implements OnInit {
  constructor(public gservice: PatientService, private notificationService: NotificationService) { }
  
  ngOnInit() {
    this.gservice.getPendingOrders();
    this.gservice.pendingtest;
  }
  get username() {
    return localStorage.getItem('lspname')
  }
  testindex(test,i: number) {
    this.gservice.showToggle = true;
    var removed = this.gservice.pendingtest.splice(i,1);
    console.log(test.orderid)
    this.gservice.deletesignlerecord(this.username,test.orderid,test.testcode).subscribe((data:any)=>{
      console.log(data);
      if (data == 1){
        this.notificationService.success(':: Your Order is deleted...')
        this.gservice.getPendingOrders(); 
      }
    })
  }
}

