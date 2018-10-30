import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { UserIdModel } from './user-id.model';
import { UserIdSource } from './user-id-source';
import { shareReplay, merge } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserIdRepositoryService implements UserIdSource {
  readonly UserIdObservable: Observable<UserIdModel>;
  private readonly _userIdObservable: Observable<UserIdModel>;

  constructor(private readonly UserIdSubject: Subject<UserIdModel>) {
    this.UserIdObservable = this.UserIdSubject.asObservable();
    this._userIdObservable = of(null)
    .pipe(
      merge(this.UserIdObservable),
      shareReplay(1),
      );
   }

   newUser(userId: string): Observable<UserIdModel> {
     const userIdModel = new UserIdModel(userId);
     this.UserIdSubject.next(userIdModel);
     return this.UserIdObservable;
   }

   async getUserId(): Promise<UserIdModel> {
     return await this._userIdObservable
      .toPromise();
   }
}
