import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);  

  /* Verifica a variável loggedIn do service para ver se ele está logado ou não. */
  return authService.isLoggedIn().pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['login']);
        return false;
      }
      return true;
    }),
    catchError(() => {
      router.navigate(['login']);
      return of(false);
    })
  );
};
