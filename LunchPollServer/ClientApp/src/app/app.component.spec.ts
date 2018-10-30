import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserIdSource } from './user-id/user-id-source';
import { UserIdStorageService } from './user-id/user-id-storage.service';
import { Subject, empty, of } from 'rxjs';
import { UserIdModel } from './user-id/user-id.model';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: UserIdSource, useFactory: () => jasmine.createSpyObj('userIdSource', ['UserIdObservable'])},
        {provide: UserIdStorageService, useFactory: () => jasmine.createSpyObj('userIdStorageService', ['Set'])}
      ]
    }).compileComponents();
    const userIdSource: UserIdSource = TestBed.get(UserIdSource);
    (<any>userIdSource).UserIdObservable = empty();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Lunch Poll'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Lunch Poll');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Lunch Poll!');
  });

  it('should set the stored user id', () => {
    // assemble
    const userIdSubject = new Subject<UserIdModel>();
    const userIdSource: UserIdSource = TestBed.get(UserIdSource);
    (<any>userIdSource).UserIdObservable = userIdSubject.asObservable();

    const userIdStorageService = TestBed.get(UserIdStorageService);
    const setSpy: jasmine.Spy = userIdStorageService.Set;
    setSpy.and.returnValue(of(true));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // ensures OnInit is fired

    const expected = 'some id';
    const u: UserIdModel = {
      id: expected
    };

    // act
    userIdSubject.next(u);
    const actual = setSpy.calls.mostRecent().args[0];

    expect(actual).toBe(expected);
  });
});
