import { Component, inject, Input, input, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { AuthServiceService } from '../../auth-service.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { FormatAMMPipe } from "../../format-ampmpipe.pipe";
import { async } from 'rxjs';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [SideBarComponent, FormsModule,FormatAMMPipe,CommonModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit {
  subButtonflgMore: any =false;
  subButtonflgLess: any =false;
  hasUpcomingAppointments: any;
  hasPastAppointments: any;
  upcomingAppointments: any;
  pastAppointments: any;
  deleteAppointment(_t35: any) {
    throw new Error('Method not implemented.');
  }
  viewDetails(_t35: any) {
    throw new Error('Method not implemented.');
  }
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
  //selectedDate: any;
  appoitments: any;
  appflg: boolean = true;
  username: any;
  currentDateTime = new Date().toISOString();
  selectedDate: string = '';
  filteredFutureAppointments: any[] = [];
  filteredPastAppointments: any[] = [];

  // Existing variables
 
  constructor() {

  }

  ngOnInit(): void {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0]; // Set today's date in `YYYY-MM-DD` format
  
    // Subscribe to user data from the AuthService
    this.username = localStorage.getItem('email');
    this.getDrAppointment(); // Get the doctor's appointments
    this.auth.user$.subscribe(userData => {
      this.user = userData;
    });
  
    // Subscribe to doctor flag from DataService
    this.ds.doctorflg$.subscribe(data => {
      this.doctorflg = data;
    });
  
    this.ds.appoitmentflg$.subscribe(data => {
      this.appflg = data;
    });
  
    // Fetch patient data when the component initializes
    this.ds.getRegistredUsers(this.user).subscribe((data) => {
      //data.forEach(email: string, password: string) => {
        if (data.email === this.user) {
          this.patientData = data;
        }
      });
    //});
  }
  
  getDrAppointment(): void {
    this.ds.getAppoitmentsInformation(this.username).subscribe({
      next: (data: any) => {
        // Assign all appointments
        this.appoitments = data;
  
        // Get current date and time as a Date object
        const currentDate = new Date(this.currentDateTime);
  
        // Filter upcoming and past appointments
        this.upcomingAppointments = this.appoitments.filter(
          (item: any) => 
            item.doctor_email === this.user && 
            new Date(item.date_time) > currentDate
        );
  
        this.pastAppointments = this.appoitments.filter(
          (item: any) => 
            item.doctor_email === this.user && 
            new Date(item.date_time) < currentDate
        );
  
        // Set flags
        this.hasUpcomingAppointments = this.upcomingAppointments.length > 0;
        this.hasPastAppointments = this.pastAppointments.length > 0;
  
        // Now that appointments are fetched, trigger the date filter function
        this.filterAppointmentsByDate(); // Trigger the filter after fetching appointments
  
        // Debugging logs
        console.log('Upcoming Appointments:', this.upcomingAppointments);
        console.log('Past Appointments:', this.pastAppointments);
      },
      error: (err: any) => {
        console.error('Error fetching appointments:', err);
      }
    });
  }
  filterAppointmentsByDate(): void {
    const selectedDate = this.selectedDate ? new Date(this.selectedDate) : new Date(); // Default to current date if no date is selected
  
    this.filteredFutureAppointments = this.upcomingAppointments?.filter((item: any) => {
      const appointmentDate = new Date(item.date_time);
      return appointmentDate.toDateString() === selectedDate.toDateString();
    }) || [];
  
    this.filteredPastAppointments = this.pastAppointments?.filter((item: any) => {
      const appointmentDate = new Date(item.date_time);
      return appointmentDate.toDateString() === selectedDate.toDateString();
    }) || [];
  
    console.log('Filtered Future Appointments:', this.filteredFutureAppointments);
    console.log('Filtered Past Appointments:', this.filteredPastAppointments);
  }


  getDoctorInfo(id: number): void {
    // Only call getDoctorsData once with the provided id

    this.ds.getDoctorsData(id).subscribe((data: any) => {
      this.drChoseData = data;
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
  cancelAppointment(id: number): void {
    this.ds.deleteAppoitment(id).subscribe({
      next: (data) => {
        this.ds.getAppoitmentData(this.user).subscribe((data: any) => {
          this.appoitments = data;
          this.getDrAppointment();
        });
        this.subButtonflg = false;
      },
      error: (err) => {
        console.error('Error deleting appointment', err);
      }
    });
  }
}