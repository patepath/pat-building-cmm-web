import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {Md5} from "md5-typescript";

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class Report1Service {

  constructor(private readonly _http: HttpClient) { }

  generage(frmDate: String, toDate: string): Observable<Report1[]> {
    return this._http.get<Report1[]>(`${URLAPI}/issue/report1/${frmDate}/${toDate}`);
  }
}

export interface Report1 {
  type: number;
  total: number;
}
