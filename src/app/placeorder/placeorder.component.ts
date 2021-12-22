import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GmapComponent } from '../gmap/gmap.component';
import { NotificationService } from '../notification.service';
import { MobileviewComponent } from '../patientbucket/mobileview/mobileview.component';
import { PatientbucketComponent } from '../patientbucket/patientbucket.component';
import { LabtestDetail, Labtests, usersignup } from '../shared/patient.model';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.css']
})
export class PlaceorderComponent implements OnInit {
  Orderdetails: FormGroup;
  testdetail: LabtestDetail
  testname = new FormControl();
  options: Labtests[]
  testdetails: LabtestDetail[]
  filteredOptions: Observable<Labtests[]>;
  userprofile: usersignup
  hideloader = true;
  btnclicked = false;
  totalbill: any;
  //basket_button:Boolean = false;
  displayFn(subject: any): string {
    return subject ? subject.testname : ''
  }
  rdisplayFn(rname): string {
    return rname ? rname.testname : '';
  }

  constructor(public gservice: PatientService, public router: Router,
    private notificationService: NotificationService, public dialog: MatDialog) {
    this.gservice.isMobile();
  }

  ngOnInit(): void {
    this.createForm();
    this.gservice.getcurrentOrderStatus(this.id);
    this.gservice.totalbill_()
    window.onresize = () => this.gservice.isMobileLayout = window.innerWidth <= 768;
  }

  createForm() {
    this.resetPage()
    this.gservice.GetAlllabtest().subscribe((res: any) => {
      this.options = res;
      this.filteredOptions = this.testname.valueChanges.pipe(startWith(''), map(value => this.filter(value)));
    });
  }
  orderview() {
    this.dialog.open(MobileviewComponent)
  }
  
  resetPage() {
    this.Orderdetails = new FormGroup({
      number: new FormControl(this.id),
      testname: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }
  private filter(inputStr: string): Labtests[] {
    return this.options.filter(option => option.testname.toLowerCase().includes(inputStr))
  }
  testselecion(event: MatAutocompleteSelectedEvent) {
    this.gservice.showToggle = true;
    const selectedValue = event.option.value;
    this.Orderdetails.controls["testname"].setValue(selectedValue.testname);
    //this.Orderdetails.controls["testcode"].setValue(selectedValue.testcode);
    this.gservice.GetlabtestDetail(selectedValue.code).subscribe((res: any) => {
      this.Orderdetails.controls.price.setValue(res[0].rate);
      console.log(res)
      this.testdetail = res[0];
    });

  }
  addtoBucket(Orderdetails: FormGroup,) {
    this.btnclicked = true;
    this.hideloader = false;
    this.gservice.userid = localStorage.getItem('userID')
    console.log(localStorage.getItem('userID'))
    const chkdulicatcode = this.gservice.pendingtest.map(x => x.testcode)
    if (!chkdulicatcode.includes(this.testdetail.testcode)) {
      this.gservice.pendingtest.push(this.testdetail);
      this.gservice.totalbill_();
      this.gservice.addtobucket(this.testdetail).subscribe(res => {
        if (res != 0) {
          this.notificationService.success('Your order For test ' + this.testdetail.testname +
            " is booked for now");
          this.btnclicked = false;
          this.hideloader = true;
          this.testname.reset('');
          this.Orderdetails.reset('');
          this.gservice.getPendingOrders();
          this.gservice.pendingtest;
          this.gservice.showToggle = true;
        }
      })

    }
    else {
      this.notificationService.warn(this.Orderdetails.controls["testname"].value + " is already booked");
    }
    this.btnclicked = false;
    this.hideloader = true;
    this.Orderdetails.reset('');
    this.testname.reset('');
    console.log(this.gservice.pendingtest);
  }

  onSubmit() {
    this.resetPage();
    alert('Please Login First')
    console.warn(this.Orderdetails.value);
  }


  get id() {
    return localStorage.getItem('userID')
  }

}
