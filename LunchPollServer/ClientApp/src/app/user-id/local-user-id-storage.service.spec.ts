import { TestBed, async } from '@angular/core/testing';
import { LocalUserIdStorageService } from './local-user-id-storage.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { of } from 'rxjs';
import { UserIdStorageModel } from './user-id-storage-model';

describe('LocalUserIdStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: LocalStorage, useFactory: () => jasmine.createSpyObj('localStorage', ['getItem', 'setItem'])}]
  }));

  it('should be created', () => {
    const service: LocalUserIdStorageService = TestBed.get(LocalUserIdStorageService);
    expect(service).toBeTruthy();
  });

  it('should return expected user id', async(async () => {
    const service: LocalUserIdStorageService = TestBed.get(LocalUserIdStorageService);
    const expected = 'some user id';
    const expectedModel: UserIdStorageModel = {
      UserId: expected
    };
    TestBed.get(LocalStorage).getItem.and.returnValue(of(expectedModel));

    const result = await service.UserId.toPromise();

    expect(result.UserId).toBe(expected);
  }));

  it('should set the model', async(async () => {
    const service: LocalUserIdStorageService = TestBed.get(LocalUserIdStorageService);
    const expected = 'some user id';
    const setItemSpy: jasmine.Spy = TestBed.get(LocalStorage).setItem;
    setItemSpy.and.returnValue(of(true));

    const result = await service.Set(expected).toPromise();
    const actualModel: UserIdStorageModel = setItemSpy.calls.mostRecent().args[1];

    expect(actualModel.UserId).toBe(expected);
  }));
});
