import { TestBed } from '@angular/core/testing';

import { UserIdRepositoryService } from './user-id-repository.service';
import { BehaviorSubject } from 'rxjs';
import { UserIdModel } from './user-id.model';

describe('UserIdRepositoryService', () => {
  let service: UserIdRepositoryService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new UserIdRepositoryService(new BehaviorSubject<UserIdModel>(null));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
