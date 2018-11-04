import { Component, OnInit, Input } from '@angular/core';
import { PollModel } from './poll.model';

@Component({
  selector: 'zh-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  @Input() poll: PollModel;
  constructor() { }

  ngOnInit() {
  }

}
