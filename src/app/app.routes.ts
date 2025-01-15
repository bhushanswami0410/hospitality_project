import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient.component';
import { authGuard } from './auth.guard';  // Your authGuard function
import { ErrorComponent } from './components/error/error.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PatientPageComponent } from './components/patient-page/patient-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { ReceptionistComponent } from './components/receptionist/receptionist.component';
import { AdminRoleComponent } from './components/admin-role/admin-role.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { AppoitmentComponent } from './components/appoitment/appoitment.component';
import { AppoitmentReportComponent } from './components/appoitment-report/appoitment-report.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // No guard applied here since HomeComponent is the login page
  { path: 'patient', component: PatientComponent, canActivate: [authGuard] },  // Apply the auth guard correctly
  { path: 'register', component: SignupComponent },
  { path: 'appoitment/register', component: SignupComponent },
  { path: 'contact_us', component: ContactUsComponent },
  { path: 'appoitment', component: AppoitmentComponent },
  { path: 'patient_page', component: PatientPageComponent ,canActivate: [authGuard]},
  { path: 'doctor_page', component: DoctorComponent ,canActivate: [authGuard]},
  {path:'receptionist',component:ReceptionistComponent,canActivate: [authGuard]},
  {path:'receptionist/appoitment_report',component:AppoitmentReportComponent,canActivate: [authGuard]},
  {path:'admin_role',component:AdminRoleComponent,canActivate: [authGuard]},
  {path: 'admin_role/add_doctor',component: AddDoctorComponent},
  { path: '**', component: ErrorComponent }
];
