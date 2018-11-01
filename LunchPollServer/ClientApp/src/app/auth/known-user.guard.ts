import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { InMemoryGetterService } from '../user-id/in-memory-getter.service';

@Injectable({
  providedIn: 'root'
})
export class KnownUserGuard implements CanActivate {

  constructor(private inMemoryGetterService: InMemoryGetterService,
    private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      const x = await this
        .inMemoryGetterService
        .getUserId();
      if (x == null) {
        const result = await this.router.navigate(['/login']);
        return result;
      }
      return true;

  }
}
