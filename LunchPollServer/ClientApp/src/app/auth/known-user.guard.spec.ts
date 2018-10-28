import { TestBed, async, inject } from '@angular/core/testing';
import { KnownUserGuard } from './known-user.guard';
import { UserIdSource } from '../user-id/user-id-source';
import { UserIdRepositoryService } from '../user-id/user-id-repository.service';
import { Subject, Observable } from 'rxjs';
import { UserIdModel } from '../user-id/user-id.model';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('KnownUserGuard', () => {
  const userIdModelSubject = new Subject<UserIdModel>();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KnownUserGuard,
        {provide: UserIdSource, useFactory: () => new UserIdRepositoryService(userIdModelSubject) },
        {provide: Router, useFactory: () => jasmine.createSpyObj('router', ['navigate']) }
      ],
      imports: [RouterTestingModule]
    });
  });

  it('should create', inject([KnownUserGuard], (guard: KnownUserGuard) => {
    expect(guard).toBeTruthy();
  }));

  /* it('should return true', inject([KnownUserGuard], async (guard: KnownUserGuard) => {
    const userIdModel: UserIdModel = {
      id: 'some id'
    };
    userIdModelSubject.next(userIdModel);

    const result = await toBoolean(guard.canActivate(null, null));

    expect(result).toBeTruthy();
  })); */

  it('should redirect to login', inject([KnownUserGuard], async (guard: KnownUserGuard) => {
    const router = TestBed.get(Router);
    const navigateSpy: jasmine.Spy = router.navigate;
    navigateSpy.and.returnValue(Promise.resolve(true));

    const x = guard.canActivate(null, null);
    const result = await toBoolean(x);

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  }));

  async function toBoolean(value: Observable<boolean> | Promise<boolean> | boolean): Promise<boolean> {
    if (typeof value === 'object') {
      if ((<Promise<boolean>>value).catch) {
        return <Promise<boolean>>value;
      } else {
        return await (<Observable<boolean>>value).toPromise();
      }
    }
    return value;
  }
});
