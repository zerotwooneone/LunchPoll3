import { TestBed } from '@angular/core/testing';

import { UserIdRepositoryService } from './user-id-repository.service';

describe('UserIdRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserIdRepositoryService = TestBed.get(UserIdRepositoryService);
    expect(service).toBeTruthy();
  });
});
