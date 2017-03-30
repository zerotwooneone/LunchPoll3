﻿import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PollService {

    constructor(private http: Http) { }

    public nominate(name: string): Observable<iNomination> {
        console.log(name);
        let nomination = this.newNomination(name);
        let noms = this.getNominations();

        return this.http.post('api/nomination', nomination).map((response: any) => {
            return response.json() as iNomination;
        });
    }
    public newNomination(name: string): iNomination {
        return { name: name, approves: 0, vetoes: 0 };
    }
    private saveNominations(nominations: iNomination[]) {
        localStorage.setItem('nominations', JSON.stringify(nominations));
    }
    public getNominations(pageIndex?: number): Observable<IPage<iNomination>> {
        let urlSearchParams: URLSearchParams = new URLSearchParams();
        urlSearchParams.set("pageIndex", (pageIndex == null ? "" : pageIndex).toString());
        let options: RequestOptionsArgs = { search: urlSearchParams };
        return this.http.get('api/nomination', options).map((response: any) => {
            let res = response.json();
            let noms = res;
            return noms;
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
    public clear(): iNomination[] {
        let noms = new Array<iNomination>();
        this.saveNominations(noms);
        return noms;
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

export interface IPage<T> {
    values: T[];
    hasMore: boolean;
}
