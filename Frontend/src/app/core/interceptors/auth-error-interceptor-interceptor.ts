import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

let refreshAttempt = 0;

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle only 401 errors and limit to 1 refresh attempt
      if (error.status === 401 && refreshAttempt !== 1) {
        const refreshToken = authService.refreshTokenVal;

        if (!refreshToken) {
          authService.logout();
          return throwError(() => error);
        }

        console.log('Refreshing token...', refreshAttempt);
        refreshAttempt++;

        // Try refreshing the token
        return authService.refresh(refreshToken).pipe(
          switchMap((res: any) => {
            // Reset attempt count after success
            refreshAttempt = 0;

            const newAccessToken = res?.data?.accessToken;
            const newRefreshToken = res?.data?.refreshToken;

            if (!newAccessToken) {
              authService.logout();
              return throwError(() => new Error('Failed to refresh token'));
            }

            // Save new tokens
            authService.setTokens(newAccessToken, newRefreshToken);

            // Retry the original request with new access token
            const clonedReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newAccessToken}` },
            });

            return next(clonedReq);
          }),
          catchError((refreshErr) => {
            console.error('Token refresh failed:', refreshErr);
            authService.logout();
            return throwError(() => refreshErr);
          })
        );
      }

      // If not 401 or refresh failed
      return throwError(() => error);
    })
  );
};
