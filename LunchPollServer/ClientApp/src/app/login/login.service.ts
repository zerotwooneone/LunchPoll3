import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { UserIdModel } from '../user-id/user-id.model';
import { LoginUserModel } from './login-user-model';

@Injectable({
  providedIn: 'root'
})
export abstract class LoginService {
  abstract login(username: string, password: string): Observable<LoginUserModel>;
}
