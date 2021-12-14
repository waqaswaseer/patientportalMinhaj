import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  

  hideloader = true;
  btnclicked = false;


  displayFn(subject: any): string {
    return subject ? subject.testname : ''
  }
  rdisplayFn(rname): string {
    return rname ? rname.testname : '';
  }

  constructor(public gservice: PatientService, public router: Router,
    private notificationService: NotificationService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.createForm();
    this.gservice.getcurrentOrderStatus(this.number);
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
    this.gservice.showToggle = true;
    const selectedValue = event.option.value;
    this.Orderdetails.controls["testname"].setValue(selectedValue.testname);
    this.Orderdetails.controls["price"].setValue(selectedValue.price);
    this.Orderdetails.controls["testcode"].setValue(selectedValue.testcode);
  }
  addtoBucket(Orderdetails: FormGroup,) {
    // if (this.Orderdetails.valid) {
    this.btnclicked = true;
    let obj = this.Orderdetails.getRawValue();
    console.log(obj);
    this.hideloader = false;
    const chktestcode = this.gservice.pendingtest.map(x => x.testcode)
    console.log(chktestcode)
    if (!chktestcode.includes(obj.testcode)) {
      this.gservice.pendingtest.push(obj)
      // console.log(obj.testcode)
      this.gservice.Orderdetails = obj;
      this.gservice.addtobucket().subscribe(Response => {
        if (Response != 0) {
          this.gservice.getPendingOrders();
          this.notificationService.success('Your order For test ' + this.Orderdetails.controls["testname"].value +
            " is booked for now");
          this.resetPage();
          this.hideloader = true;
          this.btnclicked = false;
          this.testname.reset('');
        }
      });
    }
    else {
      this.hideloader = true;
      this.btnclicked = false;
      this.resetPage();
      this.testname.reset('');
      this.notificationService.warn('::Tests Already booked!')
    }

    // else{
    //   this.gservice.Orderdetails = this.Orderdetails.getRawValue()
    //   console.log(this.gservice.Orderdetails)
    //   
    // }

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
      testcode: new FormControl('', Validators.required),
      testname: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }

  get username() {
    return localStorage.getItem('lspname')
  }
  get number() {
    return localStorage.getItem('lsmobileno')
  }
  changeAddress() {
    this.dialog.open(GmapComponent).afterClosed().subscribe(res => {
      this.gservice.getuserProfile();
    }
    )
  }
  checkout() {
    //console.log(this.gservice.pendingtest.forEach)
    this.gservice.showToggle = true;
    let val =  this.gservice.pendingtest.filter(item=>item.orderid)
      console.log (val[0].orderid);
      this.gservice.updatetocheckout(val[0].orderid,this.username).subscribe((data: any) => {
        console.log(data);
        if (data == 1){
          this.notificationService.success(':: Your Order is Successfully Placed')
          this.gservice.getPendingOrders();
          this.gservice.getcurrentOrderStatus(this.number);

        }
        else{
          this.notificationService.warn('Something Went Wrong')
          this.gservice.getPendingOrders();
        }
      })
    
  }
}
