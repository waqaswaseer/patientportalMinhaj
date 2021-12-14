import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PatientService } from 'src/app/shared/patient.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  constructor(public gservice : PatientService, public dialogref: MatDialogRef<OrderdetailsComponent>) { }

  ngOnInit(): void {
    
  }
  close(){
    this.dialogref.close()
  }
  
}
