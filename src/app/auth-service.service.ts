import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAuthenticatedStatus: boolean = false;  // Default to not authenticated
  private loggedInUser: string = '';
  constructor() { }
  login(email: string, password: string): boolean {
    if (email === 'bhushan@gmail.com' && password === '1234') {
      console.log('Innnnnnn')
      this.isAuthenticatedStatus = true;
      this.loggedInUser = email;  
      localStorage.setItem('email',email)// Store the logged-in user's email
      return true;
    } else {
      this.isAuthenticatedStatus = false;
      return false;
    }
  }
}
