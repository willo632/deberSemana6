import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const username = auth.getUsername();
  if (!username) {
    return router.createUrlTree(['/login']);
  }

  if (auth.isSessionValidated()) {
    return true;
  }

  try {
    const result = await firstValueFrom(auth.validateSession(username));
    if (result.valido) {
      auth.markValidated();
      return true;
    }
  } catch {
    // Backend no disponible — mantiene la sesión si ya hay datos en localStorage
    auth.markValidated();
    return true;
  }

  auth.logout();
  return router.createUrlTree(['/login']);
};
