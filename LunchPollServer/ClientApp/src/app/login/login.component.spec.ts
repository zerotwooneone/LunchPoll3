import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './login.service';
import { UserIdModel } from '../user-id/user-id.model';
import { of, empty, Subject } from 'rxjs';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserIdRepositoryService } from '../user-id/user-id-repository.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userIdSubject: Subject<UserIdModel>;

  beforeEach(async(() => {
    userIdSubject = new Subject<UserIdModel>();
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule,
      ...MaterialModule.importsForTest,
      ReactiveFormsModule],
      providers: [
        {provide: LoginService, useFactory: () => jasmine.createSpyObj('LoginService', ['login'])},
        {provide: UserIdRepositoryService, useFactory: () => new UserIdRepositoryService(userIdSubject)}
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

  it('should navigate home after successful login click', async(async () => {
    // assemble
    const navigate = spyOn((<any>component).router, 'navigate');
    TestBed.get(LoginService).login.and.returnValue(of(new UserIdModel('some id')));

    // act
    await component.loginClick();

    // assert
    expect(navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('should not call navigate with bad credentials', async(async () => {
    // assemble
    component.userName.setValue('username');
    component.password.setValue('password');
    const navigate = spyOn((<any>component).router, 'navigate');
    TestBed.get(LoginService).login.and.returnValue(empty());

    // act
    await component.loginClick();

    // assert
    expect(navigate).toHaveBeenCalledTimes(0);
  }));
});
