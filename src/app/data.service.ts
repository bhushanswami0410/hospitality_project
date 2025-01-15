import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = "http://localhost:3000/patients";
  //private doctorApiURL = "http://localhost:3000/doctors";
  private doctorApiURL = "http://localhost:5000/api/doctor";
  user: any;
  private diseasesURL = "http://localhost:3000/diseases";
  //private appoitmentURL = "http://localhost:3000/appoitment";
  private appoitmentURL ="http://localhost:5000/api/appointment";
  // private registerURL = "http://localhost:3000/users"
  private registerURL = "http://localhost:5000/api/users";
  private authURL = "http://localhost:5000/api/auth"
  //doctor_id: number =0;
  constructor(private http: HttpClient, private auth: AuthServiceService) { }
  private dr_flg = new BehaviorSubject<any>(null); // null indicates not authenticated
  doctorflg$ = this.dr_flg.asObservable();
  private ds_flg = new BehaviorSubject<any>(null); // null indicates not authenticated
  diseasesflg$ = this.ds_flg.asObservable();
  private app_flg = new BehaviorSubject<any>(null); // null indicates not authenticated
  appoitmentflg$ = this.app_flg.asObservable();
  getData(): Observable<any> {
    this.auth.user$.subscribe(userData => {
      this.user = userData;
    });
    let params = new HttpParams();
    params = params.append('email', this.user);
    return this.http.get(this.apiURL, { params });
  }
  getDoctorsData(email: any): Observable<any> {
    let params = new HttpParams();

    // Only append the doctor_id if it's not null, empty, or undefined
    if (email !== 'null' && email !== '' && email !== null) {
      // Append the provided doctor_id to the params
      params = params.append('email', email);
      this.dr_flg.next(false);
    } else {
      // If doctor_id is invalid, set a default flag and send a request without params
      this.dr_flg.next(true);
    }

    // Return HTTP request with params (if any) or without them
    return this.http.get(this.doctorApiURL, { params });
  }
  getAllDoctors():Observable<any>{
    return this.http.get(this.doctorApiURL);
  }
  getDiseasesData(ds_id: any): Observable<any> {
    let params = new HttpParams();

    // Only append the doctor_id if it's not null, empty, or undefined
    if (ds_id !== 'null' && ds_id !== '' && ds_id !== null) {
      // Append the provided doctor_id to the params
      params = params.append('ds_id', ds_id);
      this.ds_flg.next(false);
    } else {
      // If doctor_id is invalid, set a default flag and send a request without params
      this.ds_flg.next(true);
    }

    // Return HTTP request with params (if any) or without them
    return this.http.get(this.diseasesURL, { params });
  }

  // submitAppoitmentData(formData: any): Observable<any> {
  //   let params = new HttpParams();
  //   //params = params.append('ds_id', formData);
  //   this.app_flg.next(false);
  //   return this.http.post(this.appoitmentURL, { formData });

  // }
  submitAppoitmentData(formData: any): Observable<any> {
    // Initialize HttpParams if you need to append any query parameters (not being used here)
    let params = new HttpParams();
    
    // If you need to append something to params, you can do so here:
    // params = params.append('ds_id', formData.ds_id);
  
    // Set the app_flg to false before making the POST request (assuming app_flg is a BehaviorSubject)
    this.app_flg.next(false);
  
    // Use HttpClient to send the POST request with formData as the body
    return this.http.post<any>(this.appoitmentURL, { formData }, { params })
      .pipe(
        // Handle any additional operators or logic here if needed (e.g., map, catchError)
        tap(response => {
          // Handle success, if needed
          console.log('Appointment Data Submitted', response);
        }),
        catchError(error => {
          // Handle error, if needed
          console.error('Error occurred:', error);
          return throwError(error);  // Ensure to return an observable error
        })
      );
  }

  submitaddDoctor(formData: any): Observable<any> {
   // Initialize HttpParams if you need to append any query parameters (not being used here)
   let params = new HttpParams();
    
   // If you need to append something to params, you can do so here:
   // params = params.append('ds_id', formData.ds_id);
 
   // Set the app_flg to false before making the POST request (assuming app_flg is a BehaviorSubject)
   this.app_flg.next(false);
 
   // Use HttpClient to send the POST request with formData as the body
   return this.http.post<any>(this.doctorApiURL, { formData }, { params })
     .pipe(
       // Handle any additional operators or logic here if needed (e.g., map, catchError)
       tap(response => {
         // Handle success, if needed
         console.log('doctor Data Submitted', response);
       }),
       catchError(error => {
         // Handle error, if needed
         console.error('Error occurred:', error);
         return throwError(error);  // Ensure to return an observable error
       })
     );
  }
  
  getAppoitmentData(user: string): Observable<any> {
    let params = new HttpParams();

    // Only append the doctor_id if it's not null, empty, or undefined
    if (user !== 'null' && user !== '' && user !== null) {
      // Append the provided doctor_id to the params
      params = params.append('email', user);

    }
    return this.http.get(this.appoitmentURL, { params });
  }
  getAppoitmentsInformation(user: any): Observable<any> {
    return this.http.get<any[]>(this.appoitmentURL).pipe(
      // Filter the list of appointments based on the doctor's email
      map(appointments => appointments.filter(appointment => appointment?.doctor_email === user)),
      catchError(error => {
        console.error('Error in getAppointments:', error);
        return throwError(() => error);
      })
    );
  }


  deleteAppoitment(id: number): Observable<any> {
    console.log('ap_id',id);
    
    let params = new HttpParams();

    // Only append the doctor_id if it's not null, empty, or undefined
   
      params = params.append('ap_id', id);

    
    return this.http.delete(this.appoitmentURL, { params });
  }
  registerUser(formData: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('user_data', formData);
    this.app_flg.next(false);
    return this.http.post(this.registerURL, { formData });

  }
  getRegistredUsers(email: string): Observable<any> {
    // return this.http.get<any[]>(this.registerURL).pipe(
    //   // Filter the list of users based on the provided email
    //   map(users => users.filter(user => user.email === email)),
    //   catchError(error => {
    //     console.error('Error in getRegisteredUsers:', error);
    //     return throwError(() => error);
    //   })
    // );
    let params = new HttpParams();
    params = params.append('email', email);
    // //this.app_flg.next(false);
    // return this.http.post(this.authURL, { email });
    return this.http.get<any[]>(this.registerURL,{params})
  }
  
  getAuthenticatedUsers(email: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('email', email);
    // //this.app_flg.next(false);
    // return this.http.post(this.authURL, { email });
    return this.http.get<any[]>(this.registerURL,{params})
  }
  getAuthUser(email:string,password:string): Observable<any>{
    //let params = new HttpParams();
    console.log('user & password',email,password)
    return this.http.post(this.authURL, {email,password });
  }
  getAppoitmentsAll(): Observable<any> {
    return this.http.get(this.appoitmentURL);
  }
}
