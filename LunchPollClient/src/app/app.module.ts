import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FormsModule } from '@angular/forms';
import { PollService } from './poll.service';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Auth } from './auth.service';

export function AuthHttpFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig(), http, options);
}

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [PollService,
        {
            provide: AuthHttp,
            deps: [Http, RequestOptions],
            useFactory: AuthHttpFactory
            //this is a hack to provide AuthHttp without a webpack compiler error https://github.com/auth0/angular2-jwt/issues/257
        },
        Auth],
    bootstrap: [AppComponent]
})
export class AppModule { }
