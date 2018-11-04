import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollComponent } from './poll.component';
import { PollListComponent } from './poll-list.component';
import { MatListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatListModule
  ],
  declarations: [PollComponent, PollListComponent]
})
export class PollModule { }
