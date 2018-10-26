import { Injectable } from '@angular/core';
import { UserIdRepositoryService } from '../user-id/user-id-repository.service';
import { Observable, empty } from 'rxjs';
import { take } from 'rxjs/operators';
import { UserIdModel } from '../user-id/user-id.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userIdRepository: UserIdRepositoryService) {   }

  login(username: string, password: string): Observable<UserIdModel> {
    if (username === 'username' && password === 'password') {
      return this
        .userIdRepository
        .newUser('some id')
        .pipe(take(1));
    } else {
      empty();
    }
  }
}
