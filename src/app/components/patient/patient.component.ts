import { Component, inject, OnInit } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import {AuthServiceService} from '../../auth-service.service'
import { DataService } from '../../data.service';
@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit{
  user: any;
  patientData: []=[];
  errorMessage: string | undefined;
  constructor(private auth:AuthServiceService){}
  ngOnInit(): void {
    this.auth.user$.subscribe(userData => {
      this.user = userData;
    });
  }
}
