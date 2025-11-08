import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth-service';

let refreshAttempt = 0; 

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401 && refreshAttempt !== 1) {

        const refreshToken = authService.refreshTokenVal;

        if (!refreshToken) {
          authService.logout();
          return throwError(() => error);
        }

        refreshAttempt++;

        authService.refresh(refreshToken).subscribe({
          next: (res) => {
            authService.setTokens(res?.data?.accessToken, res?.data?.refreshToken);
          },
          error: (err) => {
            console.error(err);
            authService.logout();
          }
        });
      }

      return throwError(() => error);
    })
  );
};
