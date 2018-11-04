import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PollModule } from '../poll/poll.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    PollModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
