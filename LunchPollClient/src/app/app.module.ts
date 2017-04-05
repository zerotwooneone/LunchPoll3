import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FormsModule } from '@angular/forms';
import { PollService } from './poll.service';
import { Http, HttpModule, RequestOptions } from '@angular/http';
//import { AuthHttp, AuthConfig, provideAuth } from 'angular2-jwt';
import { Auth } from './auth.service';
import {AuthModule} from './auth.module';

//export function AuthHttpFactory(http: Http, options: RequestOptions) {
//    return new AuthHttp(new AuthConfig({
//        tokenName: 'id_token',
//        tokenGetter: () => {
//            let item = localStorage.getItem('id_token');
//            console.log('token in storage:' + item);
//            return item;
//        }
//    }), http, options);
//}

import { AppComponent } from './app.component';
import {
    routing,
    appRoutingProviders
} from './app.routes';
import { NominationsComponent } from './nominations/nominations.component';

@NgModule({
    declarations: [
        AppComponent,
        NominationsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AuthModule
    ],
    providers: [PollService,
        //{
        //    provide: AuthHttp,
        //    deps: [Http, RequestOptions],
        //    useFactory: AuthHttpFactory
        //    //this is a hack to provide AuthHttp without a webpack compiler error https://github.com/auth0/angular2-jwt/issues/257
        //},
        Auth,
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
