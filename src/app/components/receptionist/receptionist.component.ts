import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { DataService } from '../../data.service';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-receptionist',
  standalone: true,
  imports: [SideBarComponent, FormsModule],
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css'],
})
export class ReceptionistComponent implements OnInit {
  currentDateTime = new Date().toISOString();
  subButtonFlag: boolean = true;
  user: any;
  patientData: any;
  doctorsData: any[] = [];
  diseasesData: any[] = [];
  appointments: any[] = [];
  selectedDisease: string | null = null;
  enteredName: string | null = null;
  contactNumber: string | null = null;
  selectedDate: any;
  appointmentFlag: boolean = false;
  emailAddress: string | null = null;
  private ds = inject(DataService);
  private auth = inject(AuthServiceService);
  drChoseData: any;
  selectedOption: any;
selectedDoctor: any;
selectedDoctorId: any;
selectedDoctorName: string ='' ;
selectedDoctorEmail: string ='';
  historyFlg: boolean = false;

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.auth.user$.subscribe((userData) => {
      this.user = userData;
    });

    this.ds.getRegistredUsers(this.user).subscribe((data) => {
      // const userRecord = data.find(
      //   (obj: { formData: { email: string } }) =>
      //     obj.formData.email === this.user
      // );
      this.patientData = data;
    });

    this.ds.getDoctorsData(null).subscribe((data: any) => {
      this.doctorsData = data;
    });

    this.ds.getDiseasesData(null).subscribe((data: any) => {
      this.diseasesData = data;
    });

    this.ds.getAppoitmentsAll().subscribe((data: any) => {
      console.log(' this.historyFlg', this.historyFlg)
      this.appointments = data;
      this.appointments.forEach((item: { date_time: any; }) => {
        if(this.appointments.length > 0 && item.date_time <= this.currentDateTime){
          this.historyFlg = true;
          } else {
            this.historyFlg = false;
          }
        })
    });
    console.log('222',this.appointments)
  }

  // selectDoctor(drId: number, name: string, email: string): void {
  //   // Set the selected doctor's values
  //   this.selectedDoctorId = drId;
  //   this.selectedDoctorName = name;
  //   this.selectedDoctorEmail = email;
  // }
  selectDoctor(drId: number): void {
    // Find the selected doctor from doctorsData array
    const selectedDoctor = this.doctorsData.find(doctor => doctor.dr_id === drId);
  
    if (selectedDoctor) {
      // Store the selected doctor's details
      this.selectedDoctorId = selectedDoctor.dr_id;
      this.selectedDoctorName = selectedDoctor.name;
      this.selectedDoctorEmail = selectedDoctor.email;
    }
  }
  

  selectDisease(diseaseName: string): void {
    this.selectedDisease = diseaseName;
  }

  onSubmit(appointmentForm: NgForm): void {
    
    if (this.isDuplicateAppointment()) {
      alert('Appointment is already booked for this patient.');
      return;
    }

    const formData = {
      ap_id: Math.floor(Math.random() * 10000),
      name: this.enteredName,
      email: this.emailAddress,
      date_time: this.selectedDate,
      doctor_id: this.selectedDoctorId,
      doctor_name: this.selectedDoctorName,
      doctor_email: this.selectedDoctorEmail,
      diseases: this.selectedDisease,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.ds.submitAppoitmentData(formData).subscribe({
      next: () => {
        this.ds.getAppoitmentsAll().subscribe((data: any) => {
          this.appointments = data;
        });
        alert('Appointment booked successfully.');
      },
      error: (err) => console.error('Error occurred:', err),
    });
    // console.log('formdata',formData);
    
  }

  isDuplicateAppointment(): boolean {
    return this.appointments.some(
      (item: any) =>
        item.doctor_email === this.selectedDoctorEmail && item.email === this.emailAddress
    );
  }

  cancelAppointment(id: number): void {
    this.ds.deleteAppoitment(id).subscribe({
      next: () => {
        this.ds.getAppoitmentsAll().subscribe((data: any) => {
          this.appointments = data;
        });
        alert('Appointment canceled successfully.');
      },
      error: (err) => console.error('Error deleting appointment:', err),
    });
  }
  getDoctorInfo(id: number): void {
    // Only call getDoctorsData once with the provided id

    this.ds.getDoctorsData(id).subscribe((data: any) => {
      this.drChoseData = data;
      this.selectedOption = this.drChoseData[0].name;
      //this.selectedDoctorName = this.selectedOption
    });
  }
}
