import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserIdModel } from './user-id.model';

@Injectable({
  providedIn: 'root'
})
export class UserIdRepositoryService {
  readonly UserIdModel: Observable<UserIdModel>;
  constructor() {
    this.UserIdModel = new BehaviorSubject<UserIdModel>(new UserIdModel('something'));
   }
}
