import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UserIdModule } from './user-id/user-id.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserIdStorageService } from './user-id/user-id-storage.service';
import { LocalUserIdStorageService } from './user-id/local-user-id-storage.service';
import { UserIdRepositoryService } from './user-id/user-id-repository.service';
import { Subject } from 'rxjs';
import { UserIdModel } from './user-id/user-id.model';
import { UserIdSource } from './user-id/user-id-source';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
    HttpClientModule,
    UserIdModule,
    HomeModule,
    LoginModule,
    AppRoutingModule // this must be the last imported module which contains routes
  ],
  providers: [
    {provide: UserIdStorageService, useClass: LocalUserIdStorageService},
    {provide: UserIdRepositoryService, useFactory: () => new UserIdRepositoryService(new Subject<UserIdModel>())},
    {provide: UserIdSource, useExisting: UserIdRepositoryService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
