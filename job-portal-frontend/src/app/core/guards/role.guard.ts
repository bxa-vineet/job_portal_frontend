import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';

export const roleGuard = (expectedRole: string): CanActivateFn => {
  return () => {
    const router = inject(Router);

    const role = localStorage.getItem('role');

    if (role === expectedRole) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  };
};