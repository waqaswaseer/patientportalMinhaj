import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/shared/patient.service';

@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.css']
})
export class MyLoaderComponent implements OnInit {

  loading: boolean;

  constructor(private service:PatientService) {
    this.service.isLoading.subscribe((x) => {
      this.loading = x;
    });
  }
  ngOnInit(): void {
  }}
