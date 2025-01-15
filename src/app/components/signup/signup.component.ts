import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // For directives like *ngIf, *ngFor
import { DataService } from '../../data.service';
import { RouterLink } from '@angular/router';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

@Component({
  selector: 'app-signup',
  standalone: true, // Declare as standalone
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CommonModule], // Import required modules directly
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  ds = inject(DataService)
  success_flg: boolean = true;
  date: any = dateTimestampProvider;
  currentDateTime: string;
  constructor(private fb: FormBuilder) {
    const now = new Date();

    // Example 1: Default Date and Time (ISO String)
    this.currentDateTime = now.toISOString(); // e.g., "2024-12-19T08:25:00.123Z"

    // Example 2: Localized Date and Time String
    const localizedDateTime = now.toLocaleString(); // e.g., "12/19/2024, 8:25:00 AM"

    // Example 3: Custom Format using parts of Date
    const customFormat = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    this.signupForm = this.fb.group({
      confirmPassword: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [''],
      otp:'',
     otpExpire:'',
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.ds.registerUser(this.signupForm.value).subscribe((response) => {
        this.success_flg = false;
      })
    } else {
      //console.log('Form is invalid!');
    }
  }
}
