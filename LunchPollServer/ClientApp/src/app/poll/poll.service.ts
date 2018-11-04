import { Injectable } from '@angular/core';
import { Observable, empty, of } from 'rxjs';
import { PollModel } from './poll.model';
import { PollOptionModel } from './poll-option.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor() { }

  GetHomePolls(): Observable<PollModel[]> {
    return of([
      <PollModel>{ id: 1, name: 'something',
        options: [
          <PollOptionModel>{ id: 1, name: 'option 1'},
          <PollOptionModel>{ id: 2, name: 'option 2'}
        ]
      },
      <PollModel>{ id: 2, name: 'something else',
      description: 'some description that is too long and demonstrates what this text looks like.',
      options: [
        <PollOptionModel>{ id: 1, name: 'option 1'},
        <PollOptionModel>{ id: 2, name: 'some really long option name with too much detail. blah blah blah.'}
      ]}
    ]);
  }
}
