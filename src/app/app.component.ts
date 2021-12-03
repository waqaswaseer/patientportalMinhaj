import { SharedComponent } from './shared/shared.component';
import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from './shared/patient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'patientportal';
  userClaims: any;
  constructor(private router: Router, public patientservice: PatientService,private renderer: Renderer2) { }

  ngOnInit() {
    
  }
  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#loader');
    setTimeout(() =>{

      this.renderer.setStyle(loader, 'display', 'none');
    },5000)
  }

}

