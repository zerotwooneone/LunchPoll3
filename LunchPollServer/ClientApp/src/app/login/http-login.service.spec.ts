import { TestBed, async } from '@angular/core/testing';
import { HttpLoginService, loginUrl } from './http-login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginUserModel } from './login-user-model';

describe('HttpLoginService', () => {
  let service: HttpLoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        providers: [ ],
        imports: [HttpClientTestingModule]
      });
    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(HttpLoginService);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user id when login succeeds', async(async () => {
    const expected = 'some id';
    service.login('username', 'password').subscribe(um => {
      expect(um.userId).toBe(expected);
    });

    httpMock.expectOne({url: loginUrl, method: 'POST'}).flush(<LoginUserModel>{ userId: expected}, success);
  }));

  it('should return null when http 401 unauthorized', () => {
    service.login('invalid', 'bad')
      .subscribe(um => {
        expect(um).toBeNull();
      });

    httpMock.expectOne({url: loginUrl, method: 'POST'}).flush(null, unauthorized);
  });
});

const unauthorized = { status: 401, statusText: 'Unauthorized' };
const success = { status: 200, statusText: 'Ok' };
