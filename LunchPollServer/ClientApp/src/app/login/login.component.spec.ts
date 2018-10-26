import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { UserIdModel } from '../user-id/user-id.model';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule],
      providers: [
        {provide: LoginService, useFactory: () => jasmine.createSpyObj('LoginService', ['login'])}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect home after successful login click', async(async () => {
    // assemble
    component.userName = 'username';
    component.password = 'password';
    const navigate = spyOn((<any>component).router, 'navigate');
    TestBed.get(LoginService).login.and.returnValue(of(new UserIdModel('some id')));

    // act
    await component.loginClick();

    // assert
    expect(navigate).toHaveBeenCalledWith(['/home']);
  }));
});
