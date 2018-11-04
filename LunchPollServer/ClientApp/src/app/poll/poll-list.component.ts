import { Component, OnInit } from '@angular/core';
import { PollModel } from './poll.model';
import { PollService } from './poll.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'zh-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {

  constructor(private pollService: PollService) { }

  get polls(): Observable<PollModel[]> {
    return this.pollService
      .GetHomePolls()
      .pipe(
        take(3)
      );
  }

  ngOnInit() {
  }

  pollTrackBy(index: number, item: PollModel) {
    return item.id;
  }

}
