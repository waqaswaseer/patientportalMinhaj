import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // SIGNUPDETAIL: FormGroup
  signupForm: FormGroup;
  invalidNamesArr: string[] = ['Hello', 'Angular'];
  constructor() { }

  ngOnInit() {
    this.resetForm()
  }
  onSubmit(signupForm) {
    console.log(this.signupForm);
    console.log(this.signupForm.get('user_name').value);
    }
  resetForm() {
    this.signupForm = new FormGroup({
      user_name: new FormControl(null, [Validators.required,this.invalidNameValidation.bind(this)]),
      user_email: new FormControl(null, [Validators.email, Validators.required]),

      password_group: new FormGroup({
            user_password: new FormControl(null, [Validators.required]),
            user_confirmPassword: new FormControl(null, [Validators.required]),
        }),

      user_phone: new FormControl(null),
      user_gender: new FormControl('Male'),
      user_city: new FormControl('Ahmedabad', [Validators.required]),
      user_notification: new FormControl('email')

});
  }
  invalidNameValidation(control: AbstractControl): {[key: string]: boolean} {
    if (this.invalidNamesArr.indexOf(control.value) >= 0) {
      return {invalidName: true};
    }
    return null;
  }
}
