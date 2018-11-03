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
import { HttpClientModule } from '@angular/common/http';
import { AppInitializerModule } from './app-initializer.module';

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
    AppInitializerModule,
    AppRoutingModule // this must be the last imported module which contains routes
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
