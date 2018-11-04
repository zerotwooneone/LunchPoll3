import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PollModel } from './poll.model';
import { PollOptionModel } from './poll-option.model';
import { MatSelectionList, MatListOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'zh-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  @Input() poll: PollModel;
  @ViewChild(MatSelectionList) selectionList: MatSelectionList;
  get options(): PollOptionModel[] {
    return this.poll.options;
  }
  constructor() { }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  optionTrackBy(index: number, item: PollOptionModel) {
    return item.id;
  }

}
