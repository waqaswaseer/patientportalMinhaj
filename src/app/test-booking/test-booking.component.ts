import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PreviousordersComponent } from '../previousorders/previousorders.component';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-test-booking',
  templateUrl: './test-booking.component.html',
  styleUrls: ['./test-booking.component.css']
})
export class TestBookingComponent implements OnInit {

  constructor(private gservice:PatientService, private dialog: MatDialog, ) { }

  ngOnInit(): void {
  }
  prevousorders(){
    let dialoguconfig = new MatDialogConfig();
    dialoguconfig.height = '60%';
    dialoguconfig.width = '70%';
    this.dialog.open(PreviousordersComponent,dialoguconfig).afterClosed().subscribe(res=>{
      this.gservice.userorders = res;
    }
    )
  }
  get number() {
    return localStorage.getItem('lsmobileno')
  }
}
