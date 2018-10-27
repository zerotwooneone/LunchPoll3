import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { defaultIfEmpty, take, first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'zh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: FormControl;
  password: FormControl;

  async loginClick(): Promise<any> {
    const obs = this
      .loginService
      .login(this.userName.value, this.password.value);
    const userId = await (obs
      .pipe(defaultIfEmpty(), first())
      .toPromise());
    if (userId != null) {
      await this.router.navigate(['/home']);
    }
  }

  constructor(private router: Router,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this.userName = new FormControl('');
    this.password = new FormControl('');
  }

}
