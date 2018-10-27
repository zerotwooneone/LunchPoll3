import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserIdSource } from '../user-id/user-id-source';
import { defaultIfEmpty, first, map, shareReplay } from 'rxjs/operators';
import { UserIdModel } from '../user-id/user-id.model';

@Injectable({
  providedIn: 'root'
})
export class KnownUserGuard implements CanActivate {

  private readonly userIdModel: Observable<UserIdModel>;

  constructor(private userIdSource: UserIdSource,
    private router: Router) {
      this.userIdModel = this.userIdSource
      .UserIdModel
      .pipe(defaultIfEmpty(), shareReplay(1));
     }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(`here`);
      return this.userIdModel
        .pipe(map(u => {
          const result = u != null;
          if (!result) {
            this.router.navigate(['/login']);
          }
          console.log(`result:${result}`);
          return result;
        }));
  }
}
