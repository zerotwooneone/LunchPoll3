﻿import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class PollService {

  constructor(private authHttp: AuthHttp) { }

  public nominate(name: string): Observable<iNomination> {
    let nomination = this.newNomination(name);

    return this.authHttp.post('api/nomination', nomination).map((response: any) => {
      return response.json() as iNomination;
    });
  }
  public newNomination(name: string): iNomination {
    return { name: name, approves: 0, vetoes: 0 };
  }
  public getNominations(urlParam: string, pageIndex?: number): Observable<IPage<iNomination>> {
      if (!urlParam) {
      return Observable.throw("poll param cannot be null");
    }
    let urlSearchParams: URLSearchParams = new URLSearchParams();
    urlSearchParams.set("pageIndex", (pageIndex == null ? "" : pageIndex).toString());
    urlSearchParams.set("urlParam", urlParam);
    let options: RequestOptionsArgs = { search: urlSearchParams };
    return this.authHttp.get('api/nomination', options).map((response: any) => {
      let res = response.json();
      let noms = res;
      return noms;
    });
  }
  public approve(nom: iNomination): Observable<iNomination> {
    return this.authHttp.patch('api/nomination/approve', nom).map((response: any) => {
      return response.json() as iNomination;
    });
  }
  public veto(nom: iNomination): Observable<iNomination> {
    return this.authHttp.patch('api/nomination/veto', nom).map((response: any) => {
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

export interface IPage<T> {
  values: T[];
  hasMore: boolean;
}
