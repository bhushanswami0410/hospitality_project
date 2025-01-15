import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { PatientComponent } from './components/patient/patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DataService } from './data.service';
import { SignupComponent } from './components/signup/signup.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hospitality';
}
