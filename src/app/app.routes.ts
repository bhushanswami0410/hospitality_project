import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'home' , component:HomeComponent},
    {path:'patient',component:PatientComponent ,canActivate:[authGuard]}
];
