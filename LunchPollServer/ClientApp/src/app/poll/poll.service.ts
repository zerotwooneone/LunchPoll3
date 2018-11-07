import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PollModel } from './poll.model';
import { PollOptionModel } from './poll-option.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor() { }

  GetHomePolls(): Observable<PollModel[]> {
    return of([
      <PollModel>{ id: 1, name: 'something',
        options: [
          <PollOptionModel>{
            id: 1, name: 'option 1',
            personalRank: 1
        },
          <PollOptionModel>{
            id: 2, name: 'option 2'
          }
        ]
      },
      <PollModel>{ id: 2, name: 'something else',
      description: 'some description that is too long and demonstrates what this text looks like.',
      options: [
        <PollOptionModel>{
          id: 1, name: 'option 1',
          vetoed: true
        },
        <PollOptionModel>{
          id: 2,
          name: 'some really long option name with too much detail. blah blah blah.'
        }
      ]}
    ]);
  }

  SetSingleCandidate(pollId: number, pollCandidateId: number): Observable<PollOptionModel[]> {
    return this.GetHomePolls()
    .pipe(
      map(pma => {
        const result = pma.filter(pm => {
                    return pm.id === pollId;
                  })[0].options;
        return result;
      }),
      tap((pc: PollOptionModel[]) => {
        pc.forEach(po => {
          if (po.id === pollCandidateId) {
            (<any>po).personalRank = 1;
          } else {
            (<any>po).personalRank = 0;
          }
        });
      })
    );
  }

  ClearCandidatePersonalRanking(pollId: number): Observable<PollOptionModel[]> {
    return this.GetHomePolls()
    .pipe(
      map(pma => (pma.filter(pm => pm.id === pollId)[0].options)),
      tap((pc: PollOptionModel[]) => {
        pc.forEach(po => {
          (<any>po).personalRank = undefined;
        });
      })
    );
  }
}
