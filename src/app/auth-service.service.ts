import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isAuthenticatedStatus: boolean = false;
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  private userAuth = new BehaviorSubject<any>(null);
  userAuth_val$ = this.userAuth.asObservable();
  private not_auth = new BehaviorSubject<any>(null);
  not_auth_val$ = this.not_auth.asObservable();
  private role = new BehaviorSubject<any>(null);
  user_role$ = this.role.asObservable();
  private registeredData: any;

  private dataService: DataService; // Lazy-initialized DataService
  private role_of_user: string = '';
  constructor(private injector: Injector) {
    const email = localStorage.getItem('email');
    if (email) {
      this.isAuthenticatedStatus = true;
      this.userSubject.next(email);
      this.userAuth.next(true);
    }

    // Don't initialize DataService in constructor, do it later
    this.dataService = null as any;
  }

  private getDataService(): DataService {
    if (!this.dataService) {
      this.dataService = this.injector.get(DataService);  // Lazily initialize DataService
    }
    return this.dataService;
  }

  // login(email: string, password: string): Observable<boolean> {
  //   const dataService = this.getDataService();
  //   return new Observable<boolean>((observer) => {
  //     dataService.getAuthUser(email,password).subscribe((data: any) => {
  //      console.log('token',data)
  //       let isAuthenticated:boolean = false;
  //       if(data){
          
  //         localStorage.setItem('token',data);
  //         dataService.getRegistredUsers(email).subscribe((data:any)=>{
  //           this.registeredData = data;
  //         })
  //                this.role.next(this.registeredData[0].role);
  //           this.isAuthenticatedStatus = true;
  //           localStorage.setItem('email', email);
  //           this.userSubject.next(email);
  //           this.userAuth.next(true);
  //           isAuthenticated = true;

  //       } else {
  //             this.isAuthenticatedStatus = false;
  //         this.userAuth.next(false);
  //         this.not_auth.next(false);
  //       }
  //     //   this.registeredData = data;
  //     //   let isAuthenticated = false;
  //     //   console.log('rgs data', this.registeredData[0]);
       
  //     //     if (email === this.registeredData[0].email && password === this.registeredData[0].password) {
  //     //       this.role.next(this.registeredData[0].role);
  //     //       this.isAuthenticatedStatus = true;
  //     //       localStorage.setItem('email', email);
  //     //       this.userSubject.next(email);
  //     //       this.userAuth.next(true);
  //     //       isAuthenticated = true;
  //     //     }
    

  //     //   if (!isAuthenticated) {
  //     //     this.isAuthenticatedStatus = false;
  //     //     this.userAuth.next(false);
  //     //     this.not_auth.next(false);
  //     //   }

  //     //   observer.next(isAuthenticated); // Emit the result (true or false)
  //     //   observer.complete(); // Complete the observable
  //     // }, (error) => {
  //     //   observer.error(error); // Handle errors
  //      });
  //   });
  // }
  login(email: string, password: string): Observable<boolean> {
    const dataService = this.getDataService();
  
    return new Observable<boolean>((observer) => {
      // Authenticate the user
      dataService.getAuthUser(email, password).subscribe(
        (authResponse: any) => {
          console.log('authResponse:', authResponse);
  
          if (authResponse && authResponse.token) {
            console.log('Token received:', authResponse.token);
  
            // Save the token to localStorage
            localStorage.setItem('token', authResponse.token);
  
            // Fetch registered user details
            console.log('Calling getRegistredUsers with email:', email);
            dataService.getAuthenticatedUsers(email).subscribe(
              (userData: any) => {
                console.log('Received userData:', userData);
  
                if (userData.email!= '') {
                  console.log('User data found, updating state');
                  this.registeredData = userData;
  
                  // Set role, authentication status, and other details
                  this.role.next(this.registeredData.role);
                  this.isAuthenticatedStatus = true;
                  localStorage.setItem('email', email);
                  this.userSubject.next(email);
                  this.userAuth.next(true);
  
                  // Emit success to the observer
                  observer.next(true);
                  observer.complete();
                } else {
                  console.warn('No user data found for the provided email.');
                  this.handleAuthenticationFailure(observer);
                }
              },
              (error) => {
                console.error('Error fetching registered users:', error);
                this.handleAuthenticationFailure(observer);
              }
            );
          } else {
            console.warn('Authentication failed or token not found.');
            this.handleAuthenticationFailure(observer);
          }
        },
        (error) => {
          console.error('Error during authentication:', error);
          this.handleAuthenticationFailure(observer);
        }
      );
    });
  }
  
  
  // Helper function to handle authentication failure
  private handleAuthenticationFailure(observer: any): void {
    this.isAuthenticatedStatus = false;
    this.userAuth.next(false);
    this.not_auth.next(false);
  
    // Emit failure to the observer
    observer.next(false);
    observer.complete();
  }
  
  logout() {
    localStorage.clear(); // Clear local storage
    this.userSubject.next(null); // Reset user subject
    this.userAuth.next(false); // Mark as not authenticated
    this.not_auth.next(null); // Reset not authenticated status
  }

  isAuthenticated(): boolean {
    // Check if user is authenticated by checking localStorage for email
    return localStorage.getItem('email') !== null;
  }
}
