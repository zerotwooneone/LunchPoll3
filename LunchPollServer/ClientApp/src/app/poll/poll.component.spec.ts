import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollComponent } from './poll.component';
import { MaterialModule } from '../material/material.module';
import { MatSelectionListChange, MatListOption, MatSelectionList } from '@angular/material';
import { PollOptionModel } from './poll-option.model';
import { PollService } from './poll.service';
import { PollCandidateComponent } from '../poll-candidate/poll-candidate.component';
import { By } from '@angular/platform-browser';
import { DebugElement, ChangeDetectorRef } from '@angular/core';

describe('PollComponent', () => {
  let component: PollComponent;
  let fixture: ComponentFixture<PollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollComponent, PollCandidateComponent ],
      imports: [MaterialModule.importsForTest],
      providers: [
        {
          provide: PollService, useFactory:
          () => jasmine.createSpyObj('PollService', ['SetSingleCandidate', 'ClearCandidatePersonalRanking'])
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollComponent);
    component = fixture.componentInstance;
    component.poll = {id: null, name: null, description: null, options: null};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set single selection id when selected', () => {
    const expected = 1;
    const pollCandidate: PollOptionModel = { id: expected, name: null, personalRank: null, vetoed: null};
    const pollId = 999;
    component.poll = {
      options: [pollCandidate],
      description: null,
      id: pollId,
      name: null
    };
    fixture.detectChanges();
    const listElement = getCandidateListElement(fixture);
    const matSelectionList: MatSelectionList = listElement.componentInstance;
    const option = new MatListOption(listElement,
      getChangeDetectorRef(),
      matSelectionList);
    option.selected = true;
    option.value = pollCandidate;
    const setSingleSpy: jasmine.Spy = TestBed.get(PollService).SetSingleCandidate;

    component.optionChange(new MatSelectionListChange(matSelectionList, option));

    expect(setSingleSpy).toHaveBeenCalledWith(pollId, expected);
  });

  it('should unset single selection id when selected', () => {
    const expected = 1;
    const pollCandidate: PollOptionModel = { id: expected, name: null, personalRank: null, vetoed: null};
    component.poll = {
      options: [pollCandidate],
      description: null,
      id: expected,
      name: null
    };
    fixture.detectChanges();
    const listElement = getCandidateListElement(fixture);
    const matSelectionList: MatSelectionList = listElement.componentInstance;
    const option = new MatListOption(listElement,
      getChangeDetectorRef(),
      matSelectionList);
    option.selected = false;
    option.value = pollCandidate;
    const unSetSingleSpy: jasmine.Spy = TestBed.get(PollService).ClearCandidatePersonalRanking;

    component.optionChange(new MatSelectionListChange(matSelectionList, option));

    expect(unSetSingleSpy).toHaveBeenCalledWith(expected);
  });
});

function getChangeDetectorRef(): ChangeDetectorRef {
  return { markForCheck: () => {}, detach: () => {}, detectChanges: () => {}, checkNoChanges: () => {}, reattach: () => {} };
}

function getCandidateListElement(fixture: ComponentFixture<PollComponent>): DebugElement {
  return fixture.debugElement.query(By.css('mat-selection-list'));
}
