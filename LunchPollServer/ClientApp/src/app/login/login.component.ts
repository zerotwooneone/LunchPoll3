import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { defaultIfEmpty, first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UserIdRepositoryService } from '../user-id/user-id-repository.service';

@Component({
  selector: 'zh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: FormControl;
  password: FormControl;

  constructor(private router: Router,
    private loginService: LoginService,
    private userIdRepositoryService: UserIdRepositoryService) {
  }

  async loginClick(): Promise<any> {
    const obs = this
      .loginService
      .login(this.userName.value, this.password.value);
    const userId = await (obs
      .pipe(
        defaultIfEmpty(),
        first()
        )
      .toPromise());
    if (userId != null) {
      try {
        await this.userIdRepositoryService
        .newUser(userId.userId)
        .toPromise();
      } catch (e) {
        console.error(e);
      }

      await this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.userName = new FormControl('');
    this.password = new FormControl('');
  }

}
