import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../common/auth-service';

export const isLoggedOutGuard: CanActivateFn = (route, state) => {
  const loggedOut = !inject(AuthService).isLoggedIn();
  if (!loggedOut) {
    inject(Router).navigate(['dashboard'])
  }
  return true;
};
