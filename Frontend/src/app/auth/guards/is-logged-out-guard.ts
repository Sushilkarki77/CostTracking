import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

export const isLoggedOutGuard: CanActivateFn = (route, state) => {
  const loggedOut = !inject(AuthService).isLoggedIn();
  if (!loggedOut) {
    inject(Router).navigate(['dashboard'])
  }
  return true;
};
