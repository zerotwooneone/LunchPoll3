import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FormsModule } from '@angular/forms';
import { PollService } from './poll.service';
import { Http, HttpModule, RequestOptions } from '@angular/http';

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
