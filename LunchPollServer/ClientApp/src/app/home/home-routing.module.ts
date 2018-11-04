import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { KnownUserGuard } from '../auth/known-user.guard';
import { PollListComponent } from '../poll/poll-list.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [KnownUserGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: '',
            component: PollListComponent,
            outlet: 'pollList'
          }
        ]
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
export class HomeRoutingModule { }
