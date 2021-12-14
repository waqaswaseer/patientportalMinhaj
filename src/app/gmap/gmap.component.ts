import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NotificationService } from '../notification.service';
import { PatientService } from '../shared/patient.service';
@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {
  newAddress = new FormGroup({
    address: new FormControl(''),
    City: new FormControl(''),
  });
constructor(public service:PatientService, public dialogRef: MatDialogRef<GmapComponent>,
  private notificationService: NotificationService,  ){}
  ngOnInit() {
    this.resetForm()
    this.service.getuserProfile();

  }
  onSubmit(signupForm: FormGroup) {
    if (this.newAddress.valid) {
      this.service.newaddress = this.newAddress.getRawValue()
      console.log(this.service.newaddress);
      this.service.updateAddress().subscribe(Response => {
        if (Response != 0) {
          this.notificationService.success(':: Updated successfully');
          
          this.closeDialogue();
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
    this.newAddress = new FormGroup({
      username: new FormControl(this.username),
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
     
    });
  }
  get username() {
    return localStorage.getItem('lspname')
  }
  closeDialogue(){
    this.dialogRef.close(GmapComponent)
  }
}