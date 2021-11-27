import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Labtests, PendingBasket, usersignup } from '../shared/patient.model';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-patientbucket',
  templateUrl: './patientbucket.component.html',
  styleUrls: ['./patientbucket.component.css']
})
export class PatientbucketComponent implements OnInit {
  constructor(public gservice: PatientService) { }

  ngOnInit() {
    this.gservice.getPendingOrders();
    this.gservice.pendingtest;    
  }  
  get username() {
    return localStorage.getItem('lspname')
  }
}

