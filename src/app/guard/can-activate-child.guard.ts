import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const canActivateChildGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const token = localStorage.getItem('access_token');

  if (!token) {
    return of(false);
  }

  return authService.validateToken(token).pipe(
    map(isValid => {
      return isValid;
    }),
    catchError(() => of(false))
  );
};
