import { TestBed } from '@angular/core/testing';
import { InMemoryGetterService } from './in-memory-getter.service';
import { Subject, Observable } from 'rxjs';
import { UserIdModel } from './user-id.model';

describe('InMemoryUserIdService', () => {
  let userIdSubject: Subject<UserIdModel>;
  beforeEach(() => {
    userIdSubject = new Subject<UserIdModel>();
    TestBed.configureTestingModule({
      providers: [
        {provide: Observable, useFactory: () => userIdSubject}
      ]
    });
  });

  it('should be created', () => {
    const service: InMemoryGetterService = TestBed.get(InMemoryGetterService);
    expect(service).toBeTruthy();
  });
});
