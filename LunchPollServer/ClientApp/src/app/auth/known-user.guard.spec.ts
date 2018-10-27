import { TestBed, async, inject } from '@angular/core/testing';

import { KnownUserGuard } from './known-user.guard';
import { UserIdSource } from '../user-id/user-id-source';
import { UserIdRepositoryService } from '../user-id/user-id-repository.service';
import { BehaviorSubject } from 'rxjs';
import { UserIdModel } from '../user-id/user-id.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('KnownUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KnownUserGuard,
        {provide: UserIdSource, useFactory: () => new UserIdRepositoryService(new BehaviorSubject<UserIdModel>(null)) }
      ],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([KnownUserGuard], (guard: KnownUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
