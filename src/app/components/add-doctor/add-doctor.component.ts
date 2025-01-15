import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [SideBarComponent,ReactiveFormsModule ],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent implements OnInit {
deleteDoctor(arg0: any) {
throw new Error('Method not implemented.');
}
  doctorForm!: FormGroup ;
  allDoctors: any;

  constructor(private fb: FormBuilder,private ds:DataService) {}

  ngOnInit(): void {
    this.initForm();
    this.ds.getAllDoctors().subscribe((data)=>{
      this.allDoctors = data;
      console.log('dr data',this.allDoctors);

    })
  }

  // Initialize the form with default values
  private initForm(): void {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      degree: ['', Validators.required],
      specialization: ['', Validators.required],
      exp: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], // Numeric experience
      result: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Handle form submission
  onSubmit(): void {
    console.log('Hellloooooooooooooooooooooooooooo');
    
    console.log('Form Data:', this.doctorForm.value);
    this.ds.submitaddDoctor(this.doctorForm.value).subscribe({
      next: (response) => {
        // console.log('Doctor added successfully:', response);
        this.ds.getAllDoctors().subscribe((data)=>{
          this.allDoctors = data;
          console.log('dr data',this.allDoctors);
        })
        alert('Doctor added successfully');
      },
      error: (error) => {
        console.error('Error occurred while adding doctor:', error);
        alert('An error occurred while adding the doctor');
      }
    });
  }

}
function uuidv4(): any {
  throw new Error('Function not implemented.');
}


