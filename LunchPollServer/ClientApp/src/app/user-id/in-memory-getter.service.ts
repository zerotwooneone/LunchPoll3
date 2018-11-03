import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { UserIdModel } from './user-id.model';
import { shareReplay, merge, takeUntil, first } from 'rxjs/operators';

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
    this._userIdObservable.subscribe();
   }

   async getUserId(): Promise<UserIdModel> {
    const result = await this._userIdObservable
      .pipe(
        first(u => u != null),
        takeUntil(timer(333))
      )
    .toPromise();
    return result;
   }
}
