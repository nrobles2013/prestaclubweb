import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { LoginService } from './login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { throwError } from 'rxjs';
 
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const loginService = inject(LoginService);
  const token = loginService.getToken(); 
  const router = inject(Router);
  let authReq = req;

  if (token != null) {

    const decodedToken: any = jwtDecode(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);

    if (expirationDate < new Date()) {
      // Token ha expirado, redirigir al login
      router.navigate(['/authentication/login']);
      return throwError('Token expired');
    }

    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(authReq);
};
