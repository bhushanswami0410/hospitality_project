// import { Component, inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
// import { DataService } from '../../data.service';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-appoitment',
//   standalone: true,
//   imports: [ReactiveFormsModule,RouterLink],
//   templateUrl: './appoitment.component.html',
//   styleUrl: './appoitment.component.css'
// })
// export class AppoitmentComponent implements OnInit {
//   ds = inject(DataService)
//   success_flg: boolean = false;
//   error_flg:boolean = false;
//   date: any = dateTimestampProvider;
//   currentDateTime: string;
//   drChoseData: any;
//   selectedOption: any;
//   doctorsData: any;
  
//   diseasesData: any;
//   dsChoseData: any;
//   dsselectedOption: any;
// appoitmentForm: FormGroup<any>;
//   selectedDoctorName: string | null | undefined;
//   selectedDoctorEmail: string | null | undefined;
//   selectedDoctorId: string | null | undefined;
//   selectDoctor(event: Event): void {
//     const selectedOption = event.target as HTMLSelectElement;
//     const selectedName = selectedOption.options[selectedOption.selectedIndex].getAttribute('data-name');
//     const selectedEmail = selectedOption.options[selectedOption.selectedIndex].getAttribute('data-email');
//     const selectedDrId = selectedOption.options[selectedOption.selectedIndex].getAttribute('data-dr_id');

// this.selectedDoctorName = selectedName;
// this.selectedDoctorEmail = selectedEmail;
// this.selectedDoctorId = selectedDrId
//   }
//   constructor(private fb: FormBuilder) {
//     const now = new Date();

//     // Example 1: Default Date and Time (ISO String)
//     this.currentDateTime = now.toISOString(); // e.g., "2024-12-19T08:25:00.123Z"

//     // Example 2: Localized Date and Time String
//     const localizedDateTime = now.toLocaleString(); // e.g., "12/19/2024, 8:25:00 AM"

//     // Example 3: Custom Format using parts of Date
//     const customFormat = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
//     this.appoitmentForm = this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(3)]],
//       email: ['', [Validators.required, Validators.email]],
//       appointmentDate: ['', Validators.required],
//       doctor: ['', Validators.required],
//       issue: ['', Validators.required]
//     });
//   }
//   ngOnInit(): void {
//     this.ds.getDoctorsData(null).subscribe((data: any) => {
//       this.doctorsData = data;
//       console.log('doctors data',this.doctorsData)
//     });
//     this.ds.getDiseasesData(null).subscribe((data: any) => {
//       this.diseasesData = data;
//     });
//   }

//   onSubmit(): void {
   
    
//     if (this.appoitmentForm.valid) {
//       const formData = {
//         //_id: Array.from(crypto.getRandomValues(new Uint8Array(12))).map(b => b.toString(16).padStart(2, '0')).join(''),          
//           ap_id: Math.floor(Math.random() * 10000),
//           name: this.appoitmentForm.value.name,
//           email: this.appoitmentForm.value.email,
//           date_time: this.appoitmentForm.value.appointmentDate,
//           doctor_id: String(this.selectedDoctorId),
//           doctor_name: this.selectedDoctorName,
//           doctor_email: this.selectedDoctorEmail,
//           diseases: this.appoitmentForm.value.issue,
//           createdAt: new Date(),
//           updatedAt: new Date(),

//   };
//   console.log('form Data',formData);
//   this.ds.getAppoitmentsInformation(this.selectedDoctorEmail).subscribe((data)=>{
//       data.forEach((item: { email: any; doctor_email: string | null | undefined; })=>{
//         if(item.email ===this.appoitmentForm.value.email && item.doctor_email === this.selectedDoctorEmail){
//           this.error_flg = true;
//         } else {
//           this.ds.submitAppoitmentData(formData).subscribe((response) => {
//             this.success_flg = true;
//           })
//         }
//       })
//   })
      
//     } 
//   }
//   getDoctorInfo(id: number): void {
//     // Only call getDoctorsData once with the provided id

//     this.ds.getDoctorsData(id).subscribe((data: any) => {
//       this.drChoseData = data;
//       this.selectedOption = this.drChoseData[0].name;
//     });
//   }
//   getDiseasesInfo(id: number): void {
//     // Only call getDoctorsData once with the provided id

//     this.ds.getDiseasesData(id).subscribe((data: any) => {
//       this.dsChoseData = data;
//       this.dsselectedOption = this.dsChoseData[0].name;
//     });
//   }
// }
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { DataService } from '../../data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-appoitment',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './appoitment.component.html',
  styleUrl: './appoitment.component.css',
})
export class AppoitmentComponent implements OnInit {
  ds = inject(DataService);
  // Signals
  successFlg = signal(false);
  errorFlg = signal(false);
  doctorsData = signal<any[]>([]);
  diseasesData = signal<any[]>([]);

  date: any = dateTimestampProvider;
  currentDateTime: string;
  appoitmentForm: FormGroup;

  // Selected doctor info
  selectedDoctorName = signal<string | null>(null);
  selectedDoctorEmail = signal<string | null>(null);
  selectedDoctorId = signal<string | null>(null);

  constructor(private fb: FormBuilder) {
    const now = new Date();
    this.currentDateTime = now.toISOString();

    this.appoitmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      appointmentDate: ['', Validators.required],
      doctor: ['', Validators.required],
      issue: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ds.getDoctorsData(null).subscribe((data: any) => {
      this.doctorsData.set(data); // Update doctorsData signal
      console.log('Doctors data:', this.doctorsData());
    });

    this.ds.getDiseasesData(null).subscribe((data: any) => {
      this.diseasesData.set(data); // Update diseasesData signal
    });
  }

  selectDoctor(event: Event): void {
    const selectedOption = event.target as HTMLSelectElement;
    const selectedName = selectedOption.options[selectedOption.selectedIndex].getAttribute('data-name');
    const selectedEmail = selectedOption.options[selectedOption.selectedIndex].getAttribute('data-email');
    const selectedDrId = selectedOption.options[selectedOption.selectedIndex].getAttribute('data-dr_id');

    this.selectedDoctorName.set(selectedName);
    this.selectedDoctorEmail.set(selectedEmail);
    this.selectedDoctorId.set(selectedDrId);
  }

  onSubmit(): void {
    if (this.appoitmentForm.valid) {
      const formData = {
        ap_id: Math.floor(Math.random() * 10000),
        name: this.appoitmentForm.value.name,
        email: this.appoitmentForm.value.email,
        date_time: this.appoitmentForm.value.appointmentDate,
        doctor_id: String(this.selectedDoctorId()),
        doctor_name: this.selectedDoctorName(),
        doctor_email: this.selectedDoctorEmail(),
        diseases: this.appoitmentForm.value.issue,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.ds.getAppoitmentsInformation(this.selectedDoctorEmail()).subscribe((data) => {
        const alreadyExists = data.some(
          (item: { email: any; doctor_email: string | null }) =>
            item.email === this.appoitmentForm.value.email &&
            item.doctor_email === this.selectedDoctorEmail()
        );

        if (alreadyExists) {
          this.errorFlg.set(true);
        } else {
          this.ds.submitAppoitmentData(formData).subscribe(() => {
            this.successFlg.set(true);
          });
        }
      });
    }
  }

  getDoctorInfo(id: number): void {
    this.ds.getDoctorsData(id).subscribe((data: any) => {
      if (data.length > 0) {
        this.selectedDoctorName.set(data[0].name);
      }
    });
  }

  getDiseasesInfo(id: number): void {
    this.ds.getDiseasesData(id).subscribe((data: any) => {
      if (data.length > 0) {
        this.diseasesData.set(data);
      }
    });
  }
}
