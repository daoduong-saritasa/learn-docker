import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

/** Guard prevents a current user from accessing a route in case they are authorized. */
export function authorizedGuard(): Observable<boolean | UrlTree> {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isAuthorized$.pipe(
    map(isAuthorized => (isAuthorized ? router.parseUrl('/') : true)),
  );
}
