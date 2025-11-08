import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { retry, throwError, timer, catchError } from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: 1,
      delay: (error, retryCount) => {

        if (error instanceof HttpErrorResponse && error.status !== 401) {
          console.warn(`Retrying request... [Attempt ${retryCount + 1}]`);
          return timer(500);
        }
        throw error;
      }
    }),
    catchError((error: HttpErrorResponse) => {
      console.error('Request failed after retry:', error);
      return throwError(() => error);
    })
  );
};
