import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('email')) {
    return true;  // If authenticated, allow access to the route
  } else {
    // Redirect to the login page if not authenticated
    // this.router.(['/home'])
    return false;
  }
};
