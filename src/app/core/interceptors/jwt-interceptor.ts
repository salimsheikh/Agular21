import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { handleHttpError } from './http-error-handler';
import { AuthService } from '../features/auth/auth-service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  
  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      console.error('HTTP Error Status:', error.status);
      console.error('HTTP Error:', error);

      handleHttpError(error, router, authService);
      return throwError(() => error);
    })
  );
};

