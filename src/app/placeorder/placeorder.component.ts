import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GmapComponent } from '../gmap/gmap.component';
import { NotificationService } from '../notification.service';
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
  userprofile: usersignup
  displayFn(subject: any): string {
    return subject ? subject.testname : ''
  }
  rdisplayFn(rname): string {
    return rname ? rname.testname : '';
  }

  lat = 51.678418;
  lng = 7.809007;
  googleMapType = 'satellite';
  constructor(public gservice: PatientService, public router: Router,
    private notificationService: NotificationService,  public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
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
  addtoBucket(Orderdetails: FormGroup, ) {
    if (this.Orderdetails.valid) {
      this.gservice.Orderdetails = this.Orderdetails.getRawValue()
      console.log(this.gservice.Orderdetails)
      this.gservice.addtobucket().subscribe(Response => {
        if (Response != 0) {
          this.gservice.getPendingOrders();
          this.notificationService.success('Your order For test' + this.Orderdetails.controls["testname"].value +
          " is booked for now");
        }
        else {
          this.resetPage();
          this.notificationService.warn(this.Orderdetails.controls["testname"].value + 'order is invalid or already booked');
        }
      })
    }
    //this.resetPage()
  }

  onSubmit() {
    this.resetPage();
    alert('Please Login First')
    console.warn(this.Orderdetails.value);
  }
  resetPage() {
    this.Orderdetails = new FormGroup({
      username: new FormControl(this.username),
      testcode: new FormControl(null),
      testname: new FormControl(null),
      price: new FormControl(null),
    });
  }

  get username() {
    return localStorage.getItem('lspname')
  }
  changeAddress() {
    this.dialog.open(GmapComponent).afterClosed().subscribe(res => {
      this.gservice.getuserProfile();
    }
    )
  }
  checkout(){
    
  }
}
