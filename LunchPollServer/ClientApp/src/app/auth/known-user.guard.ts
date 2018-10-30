import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserIdSource } from '../user-id/user-id-source';

@Injectable({
  providedIn: 'root'
})
export class KnownUserGuard implements CanActivate {

  constructor(private userIdSource: UserIdSource,
    private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      const x = await this
        .userIdSource
        .getUserId();
      if (x == null) {
        const result = await this.router.navigate(['/login']);
        return result;
      }
      return true;

  }
}
