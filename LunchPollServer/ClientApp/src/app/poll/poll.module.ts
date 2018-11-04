import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollComponent } from './poll.component';
import { PollListComponent } from './poll-list.component';
import { MatListModule, MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [PollComponent, PollListComponent],
  exports: [PollListComponent]
})
export class PollModule { }
