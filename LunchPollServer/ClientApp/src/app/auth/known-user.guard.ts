import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserIdSource } from '../user-id/user-id-source';
import { shareReplay, merge, switchMap, take } from 'rxjs/operators';
import { UserIdModel } from '../user-id/user-id.model';

@Injectable({
  providedIn: 'root'
})
export class KnownUserGuard implements CanActivate {

  private readonly userIdModel: Observable<UserIdModel>;

  constructor(private userIdSource: UserIdSource,
    private router: Router) {
      this.userIdModel = of(null)
      .pipe(
        merge(this.userIdSource.UserIdModel),
        shareReplay(1),
        );
     }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const x = this.userIdModel
        .pipe(
          take(1),
          switchMap(u => {
            if (u == null) {
              const result = this.router.navigate(['/login']);
              return result;
            }
            return Promise.resolve(true);
          })
        );
        x.subscribe();
      return x;
  }
}
