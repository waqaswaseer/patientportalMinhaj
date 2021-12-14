import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { orderdetail } from '../shared/patient.model';
import { PatientService } from '../shared/patient.service';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';

@Component({
  selector: 'app-previousorders',
  templateUrl: './previousorders.component.html',
  styleUrls: ['./previousorders.component.css']
})
export class PreviousordersComponent implements OnInit {
  constructor(private matDialogue: MatDialogRef<PreviousordersComponent>, public gservice: PatientService,
    private dialog: MatDialog) { }
  displayedColumns: string[] = ['number', 'orderid', 'timewas', 'viewdetails'];
  datasource: MatTableDataSource<any>
  ngOnInit(): void {
    this.datasource = new MatTableDataSource<any>();
    this.getpreviousorders();

  }
  getpreviousorders() {
    this.gservice.getAlluserorders(this.number).subscribe((data: any) => {
      this.datasource = new MatTableDataSource(data)
    });
  }
  get number() {
    return localStorage.getItem('lsmobileno')
  }
  viewdetails(id: any) {
    this.gservice.getAlluserpreviousordersdetails(id).subscribe((data: any) => {
      this.gservice.Orderdetails = data
      //console.log(data)
      this.gservice.hideloader = true
    });
    this.opendialog()
  }
  opendialog(){
    this.dialog.open(OrderdetailsComponent)
  }
}
