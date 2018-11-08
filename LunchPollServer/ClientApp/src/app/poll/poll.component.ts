import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PollModel } from './poll.model';
import { PollOptionModel } from './poll-option.model';
import { MatSelectionList, MatListOption, MatSelectionListChange } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PollService } from './poll.service';
import { Observable, Subject } from 'rxjs';
import { shareReplay, map, tap } from 'rxjs/operators';

@Component({
  selector: 'zh-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  poll: PollModel;
  @Input('poll') set pollInput(pollModel: PollModel) {
    this.poll = pollModel;
    this._pollCandidates.next(this.poll.options);
  }
  @ViewChild(MatSelectionList) selectionList: MatSelectionList;
  private _pollCandidates: Subject<PollOptionModel[]>;
  options: Observable<PollOptionModel[]>;
  constructor(private pollService: PollService) {
    this._pollCandidates = new Subject<PollOptionModel[]>();
    this.options = this._pollCandidates
      .asObservable()
      .pipe(
        map(pma => {
          return pma.sort((pm1, pm2) => {
            if (pm1.vetoed || pm2.vetoed) {
              if (pm1.vetoed && pm2.vetoed) {
                return pm1.id - pm2.id;
              } else {
                return pm1.vetoed ? 1 : -1;
              }
            } else {
              if (pm1.personalRank && pm2.personalRank) {
                return pm1.personalRank - pm2.personalRank;
              } else {
                return pm1.personalRank ? -1 : 1;
              }
            }
          });
        }),
        shareReplay(1)
      );
    this.options.subscribe(); // begin the replay
   }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  optionTrackBy(index: number, item: PollOptionModel) {
    return item.id;
  }

  async optionChange(matSelectionListChange: MatSelectionListChange) {
    const selected: PollOptionModel = matSelectionListChange.option.value;
    let p: Promise<PollOptionModel[]>;
    if (matSelectionListChange.option.selected) {
      p = this.pollService.SetSingleCandidate(this.poll.id, selected.id).toPromise();
    } else {
      p = this.pollService.ClearCandidatePersonalRanking(this.poll.id).toPromise();
    }
    const result = await p;
    this._pollCandidates.next(result);
  }

}
