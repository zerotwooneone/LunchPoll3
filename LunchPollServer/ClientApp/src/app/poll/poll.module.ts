import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollComponent } from './poll.component';
import { PollListComponent } from './poll-list.component';
import { MatListModule, MatCardModule, MatButtonModule } from '@angular/material';
import { PollCandidateComponent } from '../poll-candidate/poll-candidate.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [PollComponent, PollListComponent, PollCandidateComponent],
  exports: [PollListComponent]
})
export class PollModule { }
