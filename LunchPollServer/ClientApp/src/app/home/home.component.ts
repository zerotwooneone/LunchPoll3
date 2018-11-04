import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll/poll.service';
import { Observable } from 'rxjs';
import { PollModel } from '../poll/poll.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'zh-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  polls: Observable<PollModel[]>;
  constructor(private pollService: PollService) { }

  ngOnInit() {
    this.polls = this.pollService
      .GetHomePolls()
      .pipe(
        take(3)
      );
  }

}
