import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollCandidateComponent } from './poll-candidate.component';

describe('PollCandidateComponent', () => {
  let component: PollCandidateComponent;
  let fixture: ComponentFixture<PollCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollCandidateComponent);
    component = fixture.componentInstance;
    component.pollCandidate = { id: null, name: null, personalRank: null, vetoed: null};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
