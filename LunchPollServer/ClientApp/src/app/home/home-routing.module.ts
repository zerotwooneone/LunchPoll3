import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { KnownUserGuard } from '../auth/known-user.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [KnownUserGuard]}
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
