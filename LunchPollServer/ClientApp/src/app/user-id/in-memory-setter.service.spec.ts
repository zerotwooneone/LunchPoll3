import { TestBed } from '@angular/core/testing';
import { InMemorySetterService } from './in-memory-setter.service';
import { Subject } from 'rxjs';

describe('InMemorySetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: Subject, useClass: Subject}
    ]
  }));

  it('should be created', () => {
    const service: InMemorySetterService = TestBed.get(InMemorySetterService);
    expect(service).toBeTruthy();
  });
});
