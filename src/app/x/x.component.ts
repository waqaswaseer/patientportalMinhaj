import { PatientService } from './../shared/patient.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-x',
  templateUrl: './x.component.html',
  styleUrls: ['./x.component.css']
})
export class XComponent implements OnInit {
  params: Params;
  isLoginError : boolean = false;
  userClaims: any;
  toastr: any;
  constructor(private route: ActivatedRoute,public PatientService: PatientService,private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.params = params;
      //console.log('App params', params);
      const id = params['id'];
      this.OnSubmit(id)
      //console.log('id', id);
    });
  }

  OnSubmit(onlinecode){
    sessionStorage.clear();
    localStorage.clear();
    this.PatientService.userAuthentication(onlinecode,"PX@*658").subscribe((data : any)=>{
     localStorage.setItem('userToken',data.access_token);
     this.PatientService.getUserClaims().subscribe((data: any) => {
      console.log('fffcode',onlinecode);
      this.userClaims = data;
      this.PatientService.userloging = this.userClaims.firstname;
      this.PatientService.strmobileno = this.userClaims.mobileno;
      this.PatientService.straddress = this.userClaims.address1;
      this.PatientService.strage = this.userClaims.age;
      this.PatientService.strgender = this.userClaims.gendername;
      this.PatientService.strpatientno = this.userClaims.patientno;
      this.PatientService.strpatientno = this.userClaims.userID;

      console.log('name',this.userClaims.firstname);
      localStorage.setItem("sspatientno", this.userClaims.patientno);
      var patientno =  localStorage.getItem("sspatientno");
      //console.log(patientno);
      localStorage.setItem("lspatientno", this.userClaims.patientno);
      localStorage.setItem("lspname", this.userClaims.firstname);
      localStorage.setItem("lsgendername", this.userClaims.gendername);
      localStorage.setItem("lsage", this.userClaims.age);
      localStorage.setItem("lsmobileno", this.userClaims.mobileno);
      localStorage.setItem("lsaddress", this.userClaims.address1);
      localStorage.setItem("userID", this.userClaims.userID);
      
      this.router.navigate(['/home']);
    });

     
     //this.toastr.success(data.access_token);
   },
   (err : HttpErrorResponse)=>{
     this.isLoginError = true;
     this.toastr.success("Wrong Information");
   });
 }


}
