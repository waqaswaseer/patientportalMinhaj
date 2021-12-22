import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
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
  signupForm;
  submitted:false;
  Genders: string[] = ['Male', 'Female'];
  invalidNamesArr: string[] = ['Hello', 'Angular',' '];
  constructor(public router : Router, public service : PatientService,
    private notificationService: NotificationService, private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.resetForm()
  }
  
  resetForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email:  ['', Validators.required,Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      user_confirmPassword: ['', Validators.required],
      mobileno:['', Validators.required],
      gender: ['', Validators.required],
      address:['', Validators.required],
      age: ['', Validators.required],

},
   {
  validator: MustMatch('password', 'user_confirmPassword')
});
  }
  onSubmit() {
    console.log(this.signupForm.value);    
      this.service.signup = this.signupForm.value
      console.log(this.signupForm.value);
      this.service.userSignUp().subscribe(Response => {
        if (Response != 0) {
          this.notificationService.success(':: Registered successfully');
          this.router.navigate(['login'])
        }
        else {
          this.notificationService.warn(':: This account is already existed');
          this.resetForm();
        }
      })
      // console.log(this.signupForm.get('user_name').value);
    // }
    
   }
  cancel(){
    this.router.navigate(['login'])
    this.submitted = false;
    this.resetForm();
  }

  get f(){
    return this.signupForm.controls;
  }
}


export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}