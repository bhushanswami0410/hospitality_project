import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ds = inject(DataService);
  @ViewChild('forgotPasswordModal') forgotPasswordModal: any;
  signInForm!: FormGroup; // Form group for login form
  userAuth_val: any;
  loggedIn: boolean = false;
  username: any;
  not_auth_val: any = '';
  openModal_flg = true;
  user_role: any;
modal_email: any;
confirm_psw_flg:any = 1 ;
modal_otp: any;
hidden_span: boolean = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    // Initialize form with controls
    this.signInForm = this.fb.group({
      email: [''],
      password: ['']
    });
    this.authService.userAuth_val$.subscribe(userData => {
      this.userAuth_val = userData;
    });
    this.authService.not_auth_val$.subscribe(userData => {
      this.not_auth_val = userData;
    });
    this.authService.user_role$.subscribe(data => {
      this.user_role = data;
    })
    this.username = localStorage.getItem('email');
  }


  onSubmit() {
    const { email, password } = this.signInForm.value;

    this.authService.login(email, password).subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          // Successful login, navigate to the protected route
          this.loggedIn = true;
          if (this.user_role === 'patient') {
            localStorage.setItem('role',this.user_role)
            this.router.navigateByUrl('patient_page');
          } else if (this.user_role === 'doctor') {
            localStorage.setItem('role',this.user_role)
            this.router.navigateByUrl('doctor_page');
          } else if (this.user_role === 'receptionist') {
            localStorage.setItem('role',this.user_role)
            this.router.navigateByUrl('receptionist');
          } else if (this.user_role === 'admin') {
            localStorage.setItem('role',this.user_role)
            this.router.navigateByUrl('admin_role');
          }
         
        } else {
          // If login fails, redirect to the login page
          this.loggedIn = false;
          this.router.navigateByUrl('');
        }
      },
      (error) => {
        // Handle any error during the login process
        console.error('Login error:', error);
        this.loggedIn = false;
      }
    );
  }
  openForgotPasswordModal() {
    this.modalService.open(this.forgotPasswordModal, { centered: true });
  }
  onClose(modal:any){
    this.confirm_psw_flg = 1
    this.modal_email = '';
    this.hidden_span = true;
    modal.close();
    
    
  }
  onResetModal(){
    this.confirm_psw_flg = 1
    this.modal_email = '';
    this.hidden_span = true;
  }
  onSubmitModal(data: any): void {
    this.hidden_span = true;
    console.log('Initial confirm_psw_flg:', this.confirm_psw_flg);
  
    // Call the service to get authenticated users
    this.ds.getAuthenticatedUsers(data.form.value.modal_email).subscribe({
      next: (response) => {
        console.log('Response from getAuthenticatedUsers:', response);
  
        if (response?.email) {
          // If the email exists in the response, update the flag to 2
          this.confirm_psw_flg = 2;
          console.log('Updated confirm_psw_flg to 2:', this.confirm_psw_flg);
        } else {
          // If the email does not exist, check for statusText "Not Found"
          this.confirm_psw_flg = response?.statusText === 'Not Found' ? 3 : 0;
          console.log('Updated confirm_psw_flg:', this.confirm_psw_flg);
        }
      },
      error: (error) => {
        // Handle errors from the API call
        console.error('Error occurred:', error);
        this.hidden_span = false; // Reset the flag or handle error-specific logic
        console.log('Updated confirm_psw_flg:', this.confirm_psw_flg);
      },
    });
  }
  
 
}
