import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../common/auth-service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const loggedIn = inject(AuthService).isLoggedIn();

  if (!loggedIn) {
    inject(Router).navigate(['auth'])
  }
  return true;
};
