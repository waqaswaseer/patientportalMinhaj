import { ToastrModule } from 'ngx-toastr';
import { CurrentVisitData, Patient } from './../../shared/patient.model';
import { PatientService } from './../../shared/patient.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allvisits',
  templateUrl: './allvisits.component.html',
  styleUrls: ['./allvisits.component.css']
})
export class AllvisitsComponent implements OnInit {
  message:string;
  angular: any;
  rowexp : boolean = false;
  clicklabno:string;
  constructor(public patientservice: PatientService) { 

    
  }

  //$scope.my = { rowexp: false };

  ngOnInit() {
    var patientno =  localStorage.getItem("lspatientno");

    this.patientservice.allVisitsList(patientno);
    console.log(patientno);
    //this.patientservice.userloging = patientno;
  }

  populateForm(pt: Patient) {
    this.rowexp = true;
    console.log('labno is '+pt.labno)
    if (this.clicklabno == pt.labno)
    {
      this.clicklabno = "0";
    }
    else
    {
      this.clicklabno = pt.labno;
      this.patientservice.LabNoDetail(pt.labno);
    }
    
    
  }

  loadBill(pt: Patient) {
      window.open(pt.pdfbill);
  }

  loadReport(pt: CurrentVisitData) {
    if (pt.rptstatus=="Ok")
      window.open(pt.pdfurl);
  
  }
}
