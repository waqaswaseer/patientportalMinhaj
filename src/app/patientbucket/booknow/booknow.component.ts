import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GmapComponent } from 'src/app/gmap/gmap.component';
import { NotificationService } from 'src/app/notification.service';
import { PatientService } from 'src/app/shared/patient.service';

@Component({
  selector: 'app-booknow',
  templateUrl: './booknow.component.html',
  styleUrls: ['./booknow.component.css']
})
export class BooknowComponent implements OnInit {

  constructor(public gservice:PatientService,public dialog: MatDialog,
    private notificationService: NotificationService, public router: Router) { }

  ngOnInit(): void {
    this.gservice.getuserProfile();
    this.gservice.totalbill_();
  }

  changeAddress() {
    var dialouge = new MatDialogConfig();
    dialouge.width = 'auto';
    dialouge.height = 'auto';
    this.dialog.open(GmapComponent,dialouge).afterClosed().subscribe(res => {
      this.gservice.getuserProfile();
    }
    )
  }
  checkout() {
    // this.gservice.pendingtest.forEach()
    this.gservice.showToggle = true;
    let val = this.gservice.pendingtest.filter(item => item.orderid)
    console.log(val[0].orderid);
    this.gservice.updatetocheckout(val[0].orderid).subscribe((data: any) => {
      console.log(data);
      if (data == 1) {
        this.notificationService.success(':: Your Order is Successfully Placed')
        this.gservice.getPendingOrders();
        this.gservice.getcurrentOrderStatus(this.id);
        this.router.navigate(['test-booking'])
      }
      else {
        this.notificationService.warn('Something Went Wrong')
        this.gservice.getPendingOrders();
        this.router.navigate(['test-booking'])
      }
    })
  }
  get id() {
    return localStorage.getItem('userID')
  }
  get username() {
    return localStorage.getItem('lspname')
  }
  get age() {
    return localStorage.getItem('lsage')
  }
  get gender() {
    return localStorage.getItem('lsgendername')
  }
  get number() {
    return localStorage.getItem('lsmobileno')
  }
  get adress() {
    return localStorage.getItem('lsaddress')
  }
  continueShopping(){
    this.router.navigate(['test-booking'])
  }

}
