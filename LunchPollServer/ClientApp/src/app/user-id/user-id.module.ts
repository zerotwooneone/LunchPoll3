import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserIdStorageService } from './user-id-storage.service';
import { LocalUserIdStorageService } from './local-user-id-storage.service';
import { InMemoryGetterService } from './in-memory-getter.service';
import { InMemorySetterService } from './in-memory-setter.service';
import { Subject } from 'rxjs';
import { UserIdModel } from './user-id.model';

const userIdSubject = new Subject<UserIdModel>();

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {provide: UserIdStorageService, useClass: LocalUserIdStorageService},
    {provide: InMemoryGetterService, useFactory: () => new InMemoryGetterService(userIdSubject.asObservable())},
    {provide: InMemorySetterService, useFactory: () => new InMemorySetterService(userIdSubject) }
  ]
})
export class UserIdModule { }
