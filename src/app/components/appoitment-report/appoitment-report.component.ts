import { Component, inject, OnInit } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { DataService } from '../../data.service';
import { AuthServiceService } from '../../auth-service.service';
import { FormsModule } from '@angular/forms';
import { FormatAMMPipe } from "../../format-ampmpipe.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appoitment-report',
  standalone: true,
  imports: [FormsModule, FormatAMMPipe,CommonModule,SideBarComponent],
  templateUrl: './appoitment-report.component.html',
  styleUrl: './appoitment-report.component.css'
})
export class AppoitmentReportComponent implements OnInit {
cancelAppointment(arg0: any) {
throw new Error('Method not implemented.');
}
filterAppointments() {
throw new Error('Method not implemented.');
}
// Existing variables
user: any;
doctorsList: any[] = [];
selectedDoctor: string = '';
selectedDate: string = '';
filteredAppointments: any[] = [];

constructor(private ds: DataService, private auth: AuthServiceService) {}

ngOnInit(): void {
  const today = new Date();
  this.selectedDate = today.toISOString().split('T')[0];
  this.user = localStorage.getItem('email');

  // Fetch doctors list
 // this.getDoctorsList();

  // Fetch appointments
  //this.getDrAppointment();
}

// getDoctorsList(): void {
//   this.ds.getDoctorsData().subscribe({
//     next: (data: any) => {
//       this.doctorsList = data;
//     },
//     error: (err) => {
//       console.error('Error fetching doctors:', err);
//     },
//   });
// }

// getDrAppointment(): void {
//   this.ds.getAppoitmentsInformation(this.user).subscribe({
//     next: (data: any) => {
//       this.appoitments = data;
//       this.filterAppointments();
//     },
//     error: (err) => {
//       console.error('Error fetching appointments:', err);
//     },
//   });
// }

// filterAppointments(): void {
//   this.filteredAppointments = this.appoitments.filter((appointment: any) => {
//     const matchesDoctor = this.selectedDoctor
//       ? appointment.doctor_id === +this.selectedDoctor
//       : true;
//     const matchesDate = this.selectedDate
//       ? new Date(appointment.date_time).toDateString() ===
//         new Date(this.selectedDate).toDateString()
//       : true;

//     return matchesDoctor && matchesDate;
//   });
// }

// cancelAppointment(id: number): void {
//   this.ds.deleteAppoitment(id).subscribe({
//     next: () => {
//       this.getDrAppointment();
//     },
//     error: (err) => {
//       console.error('Error cancelling appointment:', err);
//     },
//   });
// }

}
