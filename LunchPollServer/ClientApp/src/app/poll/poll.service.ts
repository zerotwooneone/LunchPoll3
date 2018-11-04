import { Injectable } from '@angular/core';
import { Observable, empty, of } from 'rxjs';
import { PollModel } from './poll.model';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor() { }

  GetHomePolls(): Observable<PollModel[]> {
    return of([
      <PollModel>{ id: 1, name: 'something'},
      <PollModel>{ id: 2, name: 'something else'}
    ]);
  }
}
