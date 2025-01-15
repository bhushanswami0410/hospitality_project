import { Component, signal } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service'
import { Router, RouterLink } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SignupComponent } from '../signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  user_role: string | null | undefined = localStorage.getItem('role');
  userAuth_val: any;
  logout() {
    throw new Error('Method not implemented.');
  }

  logged: any;
  user: any = null;
  token:any;
  constructor(private auth: AuthServiceService, private Router: Router) {
    this.logged = auth.login;
    console.log(this.logged)
    this.token = localStorage.getItem('token')
    console.log('usrrr',this.token);
    this.auth.userAuth_val$.subscribe(userData => {
      this.userAuth_val = userData;
    });
    console.log('userAuth_val',this.userAuth_val)
  }

  ngOnInit(): void {
    // Subscribe to the user observable to get the user data
    this.auth.user$.subscribe(userData => {
      this.user = userData;
    });
    
    console.log('usrrr',this.user_role);
 
  }

  onLogout() {

    this.auth.logout();

    this.Router.navigateByUrl('');

  }
}
