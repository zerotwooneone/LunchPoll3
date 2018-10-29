import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
import { LoginUserModel } from './login-user-model';

@Injectable({
  providedIn: 'root'
})
export class DebugLoginService implements LoginService {

  constructor() {   }

  login(username: string, password: string): Observable<LoginUserModel> {
    if (username === 'username' && password === 'password') {
      return of(<LoginUserModel>{ userId: 'some id'});
    } else {
      return of(null);
    }
  }
}
