import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { PatientService } from 'src/app/shared/patient.service';

@Component({
  selector: 'app-mobileview',
  templateUrl: './mobileview.component.html',
  styleUrls: ['./mobileview.component.css']
})
export class MobileviewComponent implements OnInit {
  constructor(public gservice: PatientService, private notificationService: NotificationService,
    public dialogref: MatDialogRef<MobileviewComponent>, public router: Router) { }
  
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
          this.dialogref.close();     
        }
      }
    })
  }
  checkout(){
    this.gservice.getuserProfile();
    this.router.navigate(['booknow']);
    this.dialogref.close();     
  }
}

