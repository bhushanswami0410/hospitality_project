import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
onLinkClick(arg0: string) {
  this.url_flg = true;
  console.log('url flggg', this.url_flg);
  
}
  auth = inject(AuthServiceService)
  user_role: any;
  url_value:string = '';
  url_flg:boolean = false;
  constructor(private router: Router){

  }
  isActive(route: string): boolean {
    return this.router.url === `/${route}`;
  }
  ngOnInit(): void {
    this.user_role = localStorage.getItem('role');
      
      //console.log('URL is',this.router.url);
  }
  isSidebarOpen = false; // Sidebar state

  // Toggle the sidebar visibility on mobile view
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
 
  
}
