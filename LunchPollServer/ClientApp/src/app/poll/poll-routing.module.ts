import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnownUserGuard } from '../auth/known-user.guard';
import { PollDetailComponent } from './poll-detail/poll-detail.component';

const routes: Routes = [
  {
    path: 'poll/:id',
    canActivate: [KnownUserGuard],
    children: [
      {
        path: '',
        component: PollDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PollRoutingModule { }
