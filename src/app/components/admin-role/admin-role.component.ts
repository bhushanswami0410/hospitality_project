import { Component } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-role',
  standalone: true,
  imports: [SideBarComponent,ReactiveFormsModule ],
  templateUrl: './admin-role.component.html',
  styleUrl: './admin-role.component.css'
})
export class AdminRoleComponent {

}
