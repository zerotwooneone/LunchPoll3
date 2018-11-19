import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollComponent } from './poll.component';
import { PollListComponent } from './poll-list.component';
import { MatListModule, MatCardModule, MatButtonModule, MatChipsModule } from '@angular/material';
import { PollCandidateComponent } from '../poll-candidate/poll-candidate.component';
import { PollDetailComponent } from './poll-detail/poll-detail.component';
import { PollRoutingModule } from './poll-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    PollRoutingModule,
    MatChipsModule
  ],
  declarations: [PollComponent, PollListComponent, PollCandidateComponent, PollDetailComponent],
  exports: [PollListComponent]
})
export class PollModule { }
