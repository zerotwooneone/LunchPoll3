import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PollOptionModel } from '../poll/poll-option.model';

@Component({
  selector: 'zh-poll-candidate',
  templateUrl: './poll-candidate.component.html',
  styleUrls: ['./poll-candidate.component.scss']
})
export class PollCandidateComponent implements OnInit {
  get name(): string { return this._pollCandidateModel.name; }
  get personalRank(): number { return this._pollCandidateModel.personalRank; }
  get vetoed(): boolean { return this._pollCandidateModel.vetoed; }
  private _pollCandidateModel: PollOptionModel;
  @Input() set pollCandidate(pollCandidateModel: PollOptionModel) {
    this._pollCandidateModel = pollCandidateModel;
  }

  constructor() { }

  ngOnInit() {
  }

}
