﻿import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';
import {Auth} from './auth.service';

@Injectable()
export class PollService {

    constructor(private http: Http, private authHttp: AuthHttp, private auth: Auth) { }

    public nominate(name: string): Observable<iNomination> {
        let nomination = this.newNomination(name);
        
        return this.http.post('api/nomination', nomination).map((response: any) => {
            return response.json() as iNomination;
        });
    }
    public newNomination(name: string): iNomination {
        return { name: name, approves: 0, vetoes: 0 };
    }
    public getNominations(pageIndex?:number): Observable<iNomination[]> {
        let urlSearchParams: URLSearchParams = new URLSearchParams();
        urlSearchParams.set("pageIndex", (pageIndex == null ? "" : pageIndex).toString());
        let options: RequestOptionsArgs = { search: urlSearchParams };
//this.authHttp.tokenStream.subscribe(
//    data => console.log("token stream data:"+data),
//    err => console.log("error authHttp:" + err),
//    () => console.log('Complete')
//);
        return this.authHttp.get('api/nomination', options).map((response: any) => {
            let res = response.json();
            //let body = res._body;
            let noms = res;//body as iNomination[];
            return noms;//.map((q) => {                return q            });
        });
    }
    public approve(nom: iNomination): Observable<iNomination> {
        return this.http.patch('api/nomination/approve', nom).map((response: any) => {
            return response.json() as iNomination;
        });
    }
    public veto(nom: iNomination): Observable<iNomination> {
        return this.http.patch('api/nomination/veto', nom).map((response: any) => {
            return response.json() as iNomination;
        });
    }
}
export interface iNomination {
    name: string,
    approves?: number,
    vetoes?: number,
    id?: number,
    approved?: boolean,
    vetoed?: boolean,
    lastChanged?: Date
};
