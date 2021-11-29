import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // SIGNUPDETAIL: FormGroup
  signupForm: FormGroup;
  Genders: string[] = ['Male', 'Female'];
  invalidNamesArr: string[] = ['Hello', 'Angular',' '];
  constructor(public router : Router, public service : PatientService,
    private notificationService: NotificationService, 
    ) { }

  ngOnInit() {
    this.resetForm()
  }
  onSubmit(signupForm:FormGroup) {
    if (this.signupForm.valid){
      this.service.signup = this.signupForm.getRawValue()
      console.log(this.service.signup);
      this.service.userSignUp().subscribe(Response => {
        if (Response != 0) {
          this.notificationService.success(':: Registered successfully');
          this.router.navigate(['login'])
        }
        else {
          this.notificationService.warn(':: Invalid Data');
          this.resetForm();
        }
      })
      // console.log(this.signupForm.get('user_name').value);
    }
    }
  resetForm() {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required,this.invalidNameValidation.bind(this)]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
      user_confirmPassword: new FormControl(null, [Validators.required]),
      mobileno: new FormControl(null),
      gender: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      age: new FormControl('')

});
  }
  invalidNameValidation(control: AbstractControl): {[key: string]: boolean} {
    if (this.invalidNamesArr.indexOf(control.value) >= 0) {
      return {invalidName: true};
    }
    return null;
  }
  cancel(){
    this.router.navigate(['login'])
  }
}
