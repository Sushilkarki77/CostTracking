import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      const refreshToken = authService.refreshTokenVal;
      if (!refreshToken) {
        authService.logout();
        return throwError(() => error);
      }

      /** ------------------------------
       *   If refresh is already running
       * ------------------------------ */
      if (isRefreshing) {
        return refreshTokenSubject.pipe(
          filter((token) => token !== null),
          take(1),
          switchMap((token) => {
            const clonedReq = req.clone({
              setHeaders: { Authorization: `Bearer ${token}` },
            });
            return next(clonedReq);
          })
        );
      }

      /** ------------------------------
       *   Start a new refresh
       * ------------------------------ */
      isRefreshing = true;
      refreshTokenSubject.next(null);

      return authService.refresh(refreshToken).pipe(
        switchMap((res: any) => {
          isRefreshing = false;

          const newAccessToken = res?.data?.accessToken;
          const newRefreshToken = res?.data?.refreshToken;

          if (!newAccessToken) {
            authService.logout();
            return throwError(() => new Error('Failed to refresh token'));
          }

          authService.setTokens(newAccessToken, newRefreshToken);

          // Release all queued requests
          refreshTokenSubject.next(newAccessToken);

          const clonedReq = req.clone({
            setHeaders: { Authorization: `Bearer ${newAccessToken}` },
          });

          return next(clonedReq);
        }),

        catchError((err) => {
          isRefreshing = false;
          authService.logout();
          return throwError(() => err);
        })
      );
    })
  );
};
