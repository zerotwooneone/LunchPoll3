import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserIdRepositoryService } from './user-id-repository.service';
import { UserIdSource } from './user-id-source';
import { Subject } from 'rxjs';
import { UserIdModel } from './user-id.model';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {provide: UserIdRepositoryService, useFactory: () => new UserIdRepositoryService(new Subject<UserIdModel>())},
    {provide: UserIdSource, useExisting: UserIdRepositoryService }
  ]
})
export class UserIdModule { }
