import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserIdModel } from './user-id.model';
import { shareReplay, merge, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InMemoryGetterService {
  readonly UserIdObservable: Observable<UserIdModel>;
  private readonly _userIdObservable: Observable<UserIdModel>;

  constructor(private readonly UserIdSubject: Observable<UserIdModel>) {
    this.UserIdObservable = this.UserIdSubject;
    this._userIdObservable = of(null)
      .pipe(
        merge(this.UserIdObservable),
        shareReplay(1),
      );
   }

   async getUserId(): Promise<UserIdModel> {
     return await this._userIdObservable
      .pipe(take(1))
      .toPromise();
   }
}
