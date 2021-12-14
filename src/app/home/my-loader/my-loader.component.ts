import { Component, Input, OnInit } from '@angular/core';
import { PatientService } from 'src/app/shared/patient.service';

@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.css']
})
export class MyLoaderComponent implements OnInit {
  @Input() message = 'Please wait ...';
  loading: boolean;

  constructor() {
  }
  ngOnInit(): void {
  }}
