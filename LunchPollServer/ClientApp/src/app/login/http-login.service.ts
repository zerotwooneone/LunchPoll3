import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './login.service';
import { shareReplay, catchError } from 'rxjs/operators';
import { LoginUserModel } from './login-user-model';

@Injectable({
  providedIn: 'root'
})
export class HttpLoginService implements LoginService {

  constructor(// private userIdRepository: UserIdRepositoryService,
    private httpCLient: HttpClient) {   }

  login(username: string, password: string): Observable<LoginUserModel> {
    const body = {
      username: username,
      password: password
    };

    const x = this.httpCLient
      .post<LoginUserModel>(loginUrl, body)
      .pipe(
        catchError(this.handleError),
        shareReplay()
      );
    return x;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      /* console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`); */
      return of(null);
    }
  }
}

export const loginUrl = 'api/login.json';

