import { TestBed, async, inject } from '@angular/core/testing';

import { KnownUserGuard } from './known-user.guard';

describe('KnownUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KnownUserGuard]
    });
  });

  it('should ...', inject([KnownUserGuard], (guard: KnownUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
