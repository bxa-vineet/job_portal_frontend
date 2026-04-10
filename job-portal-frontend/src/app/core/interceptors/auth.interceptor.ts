import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/auth.service';

const skipAuthPaths = ['/login', '/signup', '/auth/login', '/auth/signup'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  const shouldSkipAuth = skipAuthPaths.some(path => req.url.includes(path));
  if (shouldSkipAuth) {
    return next(req);
  }

  if (token) {
    console.log('Attaching token to request:', token);
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};