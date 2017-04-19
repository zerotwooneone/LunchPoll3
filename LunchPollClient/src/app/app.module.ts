import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PollService } from './poll.service';
import { HttpModule } from '@angular/http';

import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';

import {
    routing,
    appRoutingProviders
} from './app.routes';
import { NominationsComponent } from './nominations/nominations.component';
import { LoginComponent } from './login/login.component';

@NgModule({ 
    declarations: [
        AppComponent,
        NominationsComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AuthModule
    ],
    providers: [PollService,
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
