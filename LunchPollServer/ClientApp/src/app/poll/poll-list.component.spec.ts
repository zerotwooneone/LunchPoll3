import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollListComponent } from './poll-list.component';
import { PollComponent } from './poll.component';
import { MaterialModule } from '../material/material.module';
import { PollCandidateComponent } from '../poll-candidate/poll-candidate.component';

describe('PollListComponent', () => {
  let component: PollListComponent;
  let fixture: ComponentFixture<PollListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollListComponent, PollComponent, PollCandidateComponent ],
      imports: [MaterialModule.importsForTest]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
