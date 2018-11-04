import { Component, OnInit, Input } from '@angular/core';
import { PollModel } from './poll.model';

@Component({
  selector: 'zh-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {

  constructor() { }

  @Input() polls: PollModel[] ;

  ngOnInit() {
  }

  pollTrackBy(index: number, item: PollModel) {
    return item.id;
  }

}
