import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { defaultIfEmpty, take, first } from 'rxjs/operators';

@Component({
  selector: 'zh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;

  async loginClick(): Promise<any> {
    const userId = await this
      .loginService
      .login(this.userName, this.password)
      .pipe(defaultIfEmpty(), first())
      .toPromise();
    if (userId != null) {
      await this.router.navigate(['/home']);
    }
  }

  constructor(private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {
  }

}
