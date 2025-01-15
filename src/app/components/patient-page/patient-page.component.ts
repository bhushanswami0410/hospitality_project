import { Component, inject, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { DataService } from '../../data.service';
import { IgetData } from '../../interface/getData';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FormatAMMPipe } from "../../format-ampmpipe.pipe";

@Component({
  selector: 'app-patient-page',
  standalone: true,
  imports: [SideBarComponent, FormsModule, FormatAMMPipe],
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.css']
})
export class PatientPageComponent implements OnInit {
  currentDateTime = new Date().toISOString();
  subButtonflg: boolean = false;
  user: any;
  ds = inject(DataService);
  auth = inject(AuthServiceService);
  patientData: any;
  doctorsData: any;
  diseasesData: any;
  drChoseData: any;
  dsChoseData: any;
  doctorflg: boolean = true;
  dsselectedOption: string = '';
  selectedOption: string = '';
  selectedDate: any;
  appoitmentData: any;
  appflg: boolean = true;
  selectedDoctorId: number | null = null;
  selectedDoctorName: string | null = null;
  selectedDoctorEmail: string | null = null;
  historyFlg:boolean = false;
  selectDoctor(drId: number, name: string, email: string): void {
    this.selectedDoctorId = drId; // Store the selected doctor's ID
    this.selectedDoctorName = name; // Store the selected doctor's name
    this.selectedDoctorEmail = email;
  }
  constructor() { }

  ngOnInit(): void {

    // Subscribe to user data from the AuthService
    this.auth.user$.subscribe(userData => {
      this.user = userData;
    });

    // Subscribe to doctor flag from DataService
    this.ds.doctorflg$.subscribe(data => {
      this.doctorflg = data;
    });
    this.ds.appoitmentflg$.subscribe(data => {
      this.appflg = data;
    })
    // Fetch patient data when the component initializes
    this.ds.getRegistredUsers(this.user).subscribe((data) => {
      console.log('55555',data);
      
      //data.forEach((obj: { formData: { email: string; password: string } }) => {
        if (data.email === this.user) {
          this.patientData = data;
        }
      })
    //});

    // Fetch doctors data when the component initializes
    this.ds.getDoctorsData(null).subscribe((data: any) => {
      this.doctorsData = data;
    });
    this.ds.getDiseasesData(null).subscribe((data: any) => {
      this.diseasesData = data;

    });
    this.ds.getAppoitmentData(this.user).subscribe((data: any) => {
      console.log('fetch call',data);
      this.appoitmentData = data;
      this.appoitmentData.forEach((item: { date_time: any; }) => {
        if(this.appoitmentData.length > 0 && item.date_time <= this.currentDateTime){
          this.historyFlg = true;
          }
          
      });
     
     

      // Check if any item matches the condition
      this.subButtonflg = this.appoitmentData.some((item: any) => item.email === this.user && item.date_time > this.currentDateTime);

    });



  }

  getDoctorInfo(email: string): void {
    // Only call getDoctorsData once with the provided id
    console.log('selected dr id', email);
    this.ds.getDoctorsData(email).subscribe((data: any) => {
      this.drChoseData = data;
      console.log('selected dr is', this.drChoseData);
      this.selectedOption = this.drChoseData[0].name;
    });
  }
  getDiseasesInfo(id: number): void {
    // Only call getDoctorsData once with the provided id

    this.ds.getDiseasesData(id).subscribe((data: any) => {
      this.dsChoseData = data;
      this.dsselectedOption = this.dsChoseData[0].name;
    });
  }
  onSubmit(appoitmentForm: any) {
    this.subButtonflg = true;
    // const formData = appoitmentForm.value;
    // this.ds.submitAppoitmentData(formData);
    //throw new Error('Method not implemented.');
    if (appoitmentForm.valid) {
      // Prepare form data
        const formData = {
          //_id: Array.from(crypto.getRandomValues(new Uint8Array(12))).map(b => b.toString(16).padStart(2, '0')).join(''),          
            ap_id: Math.floor(Math.random() * 10000),
            name: this.user.split('@')[0],
            email: this.user,
            date_time: this.selectedDate,
            doctor_id: String(this.selectedDoctorId),
            doctor_name: this.selectedDoctorName,
            doctor_email: this.selectedDoctorEmail,
            diseases: this.dsselectedOption,
            createdAt: new Date(),
            updatedAt: new Date(),

    };
    console.log('selected date time',this.selectedDate);
    
      // Call the service to post the data
      this.ds.submitAppoitmentData(formData).subscribe(
        response => {
          this.ds.getAppoitmentData(this.user).subscribe((data: any) => {
            this.appoitmentData = data;
          });
  
        },
        error => {
          console.error('Error occurred:', error);
          
        }
      );
    } else {
      alert('You have already')
    }
  }
  cancelAppointment(id: number): void {
    this.ds.deleteAppoitment(id).subscribe({
      next: (data) => {
        this.ds.getAppoitmentData(this.user).subscribe((data: any) => {
          this.appoitmentData = data;
        });
        this.subButtonflg = false;
      },
      error: (err) => {
        console.error('Error deleting appointment', err);
      }
    });
  }


}
