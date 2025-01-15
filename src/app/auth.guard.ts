import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
  const router = inject(Router); // Inject the Router instance
  const auth = inject(AuthServiceService); // Inject the AuthService

  // Check if the user is authenticated
  if (auth.isAuthenticated()) {
    return true; // If authenticated, allow access
  } else {
    // If not authenticated, redirect to the login page
    router.navigateByUrl(''); // You can change this to a login route if needed
    return false; // Prevent navigation to the requested route
  }
};
