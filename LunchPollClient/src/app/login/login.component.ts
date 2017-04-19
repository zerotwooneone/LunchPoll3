import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: Auth,
    private route: ActivatedRoute,
    private router: Router) { }

  public continueParam: Observable<string>;

  ngOnInit() {
    this.continueParam = this
      .route
      .params
      .switchMap((params) => {
        return params["poll"];
      });
    if (this.auth.authenticated()) {
      //this.gotoNominations();
    }
  }

  public gotoNominations(): Promise<boolean> {
    return this.router.navigate(['/nominations', { poll: this.continueParam }]);
  }

}
