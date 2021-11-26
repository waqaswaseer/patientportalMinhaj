import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { Labtests, PendingBasket } from '../shared/patient.model';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-patientbucket',
  templateUrl: './patientbucket.component.html',
  styleUrls: ['./patientbucket.component.css']
})
export class PatientbucketComponent implements OnInit {
  Orderdetails: FormGroup;
  pendingtest : PendingBasket[]
  Test = new FormControl();
  price = new FormControl();
  options: Labtests[] 
  filteredOptions: Observable<Labtests[]>;
  constructor(public gservice: PatientService) { }

  ngOnInit() {
    this.gservice.GetAlllabtest().subscribe(data => {this.options = data;
      this.filteredOptions =  this.Test.valueChanges.pipe(startWith(''),map(value => this.filter(this.options,value))
      )});
      console.log('my name is ' + this.username);
      this.getPendingOrders();
  }
  private filter(options: Labtests[], inputstr: string): Labtests[] {
    return options.filter(option => option.testname.toLowerCase().includes(inputstr));
  }
  displayFn(subject) : string {
    return subject ? subject.testname : '';
  }
  testselecion(event: MatAutocompleteSelectedEvent) {
    const selectedValue = event.option.value;
    this.Orderdetails.controls["testname"].setValue(selectedValue.testname);
  }
  resetPage(){
    this.Orderdetails = new FormGroup({
      username: new FormControl(this.username),
      testcode: new FormControl(),
      testname:  new FormControl(''),
      rate: new FormControl(0),
    });
  }
  get username() {
    return localStorage.getItem('lspname')
  }
  getPendingOrders(){
    this.gservice.GetOrderdetails(this.username).subscribe((data: any) => {
      this.pendingtest = data;
    });
  }
}

