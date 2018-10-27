import { TestBed, async } from '@angular/core/testing';

import { LoginService } from './login.service';
import { UserIdRepositoryService } from '../user-id/user-id-repository.service';
import { BehaviorSubject } from 'rxjs';
import { UserIdModel } from '../user-id/user-id.model';

describe('LoginService', () => {
  let service: LoginService;
  let userIdRepository: UserIdRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
      {provide: UserIdRepositoryService, useFactory: () => new UserIdRepositoryService(new BehaviorSubject<UserIdModel>(null))},
    ]});
    userIdRepository = TestBed.get(UserIdRepositoryService);
    service = new LoginService(userIdRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login valid user', async(async () => {
    const result = await service.login('username', 'password').toPromise();
    expect(result).toBeTruthy();
  }));

  it('should not return user id for invalid user', async(async () => {
    const result = await service.login('invalid', 'bad').toPromise();
    expect(result).toBeFalsy();
  }));
});
