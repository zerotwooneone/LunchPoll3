import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(public auth: Auth,
        private router: Router) { }

    ngOnInit() {
        if (this.auth.authenticated()) {
            this.router.navigate(['/nominations']);
        }
    }

}
