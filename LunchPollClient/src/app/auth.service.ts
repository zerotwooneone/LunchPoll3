import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig }        from './auth.config';
import Auth0Lock from 'auth0-lock';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {});

  constructor(private router:Router) {
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
      //this is the fix for hash based routing
      //router
      //    .events
      //    .filter(event => event instanceof NavigationStart)
      //    .filter((event: NavigationStart) => (/access_token|id_token|error/).test(event.url))
      //    .subscribe(() => {
      //        this.lock.resumeAuth(window.location.hash, (error:any, authResult:any):void => {
      //            if (error) return console.log(error);
      //            localStorage.setItem('id_token', authResult.idToken);
      //            router.navigate(['/']);
      //        });
      //    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  };

}
