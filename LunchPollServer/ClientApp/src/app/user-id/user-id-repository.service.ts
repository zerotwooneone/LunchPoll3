import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserIdModel } from './user-id.model';
import { UserIdSource } from './user-id-source';

@Injectable({
  providedIn: 'root'
})
export class UserIdRepositoryService implements UserIdSource {
  readonly UserIdModel: Observable<UserIdModel>;

  constructor(private readonly UserIdSubject: Subject<UserIdModel>) {
    this.UserIdModel = this.UserIdSubject.asObservable();
   }

   newUser(userId: string): Observable<UserIdModel> {
     const userIdModel = new UserIdModel(userId);
     this.UserIdSubject.next(userIdModel);
     return this.UserIdModel;
   }
}
