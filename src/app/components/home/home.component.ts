import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  signInForm!: FormGroup; // Declare the signInForm as FormGroup
  private isAuthenticatedStatus: boolean = false;  // Default to not authenticated
  private loggedInUser: string = '';
  constructor(private fb: FormBuilder,private router: Router,private AuthServiceService:AuthServiceService) {}

  ngOnInit() {
    // Initialize the form with form controls and validators
    this.signInForm = this.fb.group({
      email: [''], // You can add validators if needed, for example Validators.required, Validators.email
      password: [''], // You can add Validators here too
    });
  }

  onSubmit() {
    //if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      
      if (this.AuthServiceService.login(email, password)) {
        console.log(this.AuthServiceService.login(email, password))
        console.log('234')
        // Navigate to the protected 'patient' route after successful login
        this.router.navigateByUrl('/patient');
      } else {
        // Redirect to the home page if authentication fails
        this.router.navigateByUrl('/home');
      }
    //}
  }
}
