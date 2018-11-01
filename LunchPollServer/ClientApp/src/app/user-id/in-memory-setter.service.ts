import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserIdModel } from './user-id.model';

@Injectable({
  providedIn: 'root'
})
export class InMemorySetterService {

  constructor(private readonly UserIdSubject: Subject<UserIdModel>) { }

  newUser(userId: string): void {
    const userIdModel = new UserIdModel(userId);
    this.UserIdSubject.next(userIdModel);
  }
}
