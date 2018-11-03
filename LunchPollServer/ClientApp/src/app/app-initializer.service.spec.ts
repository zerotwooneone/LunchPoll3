import { TestBed, async } from '@angular/core/testing';
import { AppInitializerService } from './app-initializer.service';
import { InMemoryGetterService } from './user-id/in-memory-getter.service';
import { InMemorySetterService } from './user-id/in-memory-setter.service';
import { UserIdStorageModel } from './user-id/user-id-storage-model';
import { Subject, of, throwError } from 'rxjs';
import { UserIdModel } from './user-id/user-id.model';
import { UserIdStorageService } from './user-id/user-id-storage.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppInitializerService', () => {
  let inMemoryUserIdSubject: Subject<UserIdModel>;
  let userIdStorageService: jasmine.SpyObj<UserIdStorageService>;
  beforeEach(() => {
    inMemoryUserIdSubject = new Subject<UserIdModel>();
    userIdStorageService = {
      ...jasmine.createSpyObj('userIdStorageService', ['Set']),
      UserId: of(null)
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {provide: InMemorySetterService, useFactory: () => new InMemorySetterService(inMemoryUserIdSubject)},
        {provide: InMemoryGetterService, useFactory: () => new InMemoryGetterService(inMemoryUserIdSubject.asObservable())},
        {provide: UserIdStorageService, useFactory: () => userIdStorageService}
      ]
    });
  });

  it('should be created', () => {
    const service: AppInitializerService = TestBed.get(AppInitializerService);
    expect(service).toBeTruthy();
  });

  it('should set the stored user id', async( async () => {
    // assemble
    const setSpy: jasmine.Spy = userIdStorageService.Set;
    setSpy.and.returnValue(of(true));

    const service = TestBed.get(AppInitializerService);

    const expected = 'some id';
    const u: UserIdModel = {
      id: expected
    };

    // act
    await service.Init();

    inMemoryUserIdSubject.next(u);
    inMemoryUserIdSubject.complete();
    const actual = setSpy.calls.mostRecent().args[0];

    expect(actual).toBe(expected);
  }));

  it('should set in-memory user id from storage', async(async () => {
    const newUserSpy: jasmine.Spy = jasmine.createSpy('newUser');
    TestBed.get(InMemorySetterService).newUser = newUserSpy;
    newUserSpy.and.returnValue(of(true));

    const expected = 'some id';
    const storageModel: UserIdStorageModel = {
      UserId: expected
    };
    (<any>userIdStorageService).UserId = of(storageModel);

    // act
    const service = TestBed.get(AppInitializerService);
    await service.Init();

    expect(newUserSpy).toHaveBeenCalledWith(expected);
  }));

  it('should not set in-memory user id when storage is empty', async(async () => {
    const setSpy: jasmine.Spy = userIdStorageService.Set;
    setSpy.and.returnValue(throwError({message: 'this should not be called'}));

    // act
    const service = TestBed.get(AppInitializerService);
    await service.Init();

    expect(setSpy).toHaveBeenCalledTimes(0);
  }));
});
