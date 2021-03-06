import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  constructor(public gservice: PatientService, private notificationService: NotificationService,
    public router: Router) { }
  
  ngOnInit() {
    this.gservice.getPendingOrders();
    this.gservice.pendingtest;
    this.gservice.totalbill_();
    this.gservice.isMobile()
  }
  get id() {
    return localStorage.getItem('userID')
  }
  testindex(test,i: number) {
    this.gservice.showToggle = true;
    var removed = this.gservice.pendingtest.splice(i,1);
    console.log(test.orderid)
    this.gservice.deletesignlerecord(this.id,test.orderid,test.testcode).subscribe((data:any)=>{
      console.log(data);
      if (data == 1){
        this.notificationService.success(':: Your Order is deleted...')
        this.gservice.getPendingOrders();
        if(this.gservice.pendingtest.length == 0){
          this.router.navigate(['test-booking'])
        }
      }
    })
  }
  checkout(){
    this.gservice.getuserProfile();
    this.router.navigate(['booknow']);
    // this.dialogrerf.close();     
  }
}

