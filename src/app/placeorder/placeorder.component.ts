import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Labtests, usersignup } from '../shared/patient.model';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements OnInit {
  Orderdetails: FormGroup;
  testname = new FormControl();
  options: Labtests[] 
  filteredOptions: Observable<Labtests[]>;
  userprofile : usersignup
  displayFn(subject: any): string {
    return subject ? subject.testname : ''
  }
  rdisplayFn(rname) : string {
    return rname ? rname.testname :'';
  }  
  constructor(public gservice: PatientService, public router : Router) {
    
   }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.resetPage()
    this.gservice.GetAlllabtest().subscribe((res: any) => {
      this.options = res;
      this.filteredOptions = this.testname.valueChanges.pipe(startWith(''), map(value => this.filter(value)));
    });
  }
  private filter(inputStr: string): Labtests[] {
    return this.options.filter(option => option.testname.toLowerCase().includes(inputStr))
  }

  testselecion(event: MatAutocompleteSelectedEvent) {
    const selectedValue = event.option.value;
    this.Orderdetails.controls["testname"].setValue(selectedValue.testname);
    this.Orderdetails.controls["price"].setValue(selectedValue.price);
    this.Orderdetails.controls["testcode"].setValue(selectedValue.testcode);
  }

  addtoBucket(Orderdetails: FormGroup) {
    
    if (this.Orderdetails.valid) {
      this.gservice.Orderdetails = this.Orderdetails.getRawValue()
      console.log(this.gservice.Orderdetails)
      this.gservice.addtobucket().subscribe(Response => {
        if (Response != 0) {
          alert('Your order For test' + this.Orderdetails.controls["testname"].value + 
           " is booked for now")
         // this.notificationService.success(':: Your order is placed successfully');
        }
        else {
          alert(this.Orderdetails.controls["testname"].value + 'order is invalid or already booked')
          //this.notificationService.warn(':: Invalid Data');
        }
      })
    }
    //this.resetPage()
  }

  getAllLabtest() {
    
  }
  onSubmit(){
    this.resetPage();
    alert('Please Login First')
    console.warn(this.Orderdetails.value);
  }
  resetPage() {
    this.Orderdetails = new FormGroup({
      username: new FormControl(this.username),
      testcode: new FormControl(),
      testname: new FormControl(''),
      price: new FormControl(0),
    });
  }
  
  get username() {
    return localStorage.getItem('lspname')
  }
  editdata(){
    this.router.navigate(['/signup'])
  }
}
