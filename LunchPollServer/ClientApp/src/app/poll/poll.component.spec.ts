import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollComponent } from './poll.component';
import { MaterialModule } from '../material/material.module';

describe('PollComponent', () => {
  let component: PollComponent;
  let fixture: ComponentFixture<PollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollComponent ],
      imports: [MaterialModule.importsForTest]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
