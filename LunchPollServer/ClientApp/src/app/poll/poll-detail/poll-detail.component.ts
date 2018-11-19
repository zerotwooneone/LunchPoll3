import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PollOptionModel } from '../poll-option.model';

@Component({
  selector: 'zh-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.scss']
})
export class PollDetailComponent implements OnInit {

  candidates: Observable<PollOptionModel[]>;
  constructor(private pollService: PollService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.candidates = this
      .activatedRoute
      .paramMap
      .pipe(
        switchMap(params => {
          const pollId = +params.get('id');
          return this.pollService.getCandidates(pollId);
        }),
        map(array => {
          return array.sort((a, b) => a.personalRank - b.personalRank);
        }),
        shareReplay(1)
      );

  }

  candidateTrackBy(candidate: PollOptionModel) {
    return candidate.id;
  }

  getAvatar(candidate: PollOptionModel): string {
    return candidate.personalRank ? String(candidate.personalRank) : '?';
  }
}
