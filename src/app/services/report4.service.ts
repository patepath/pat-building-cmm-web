import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class Report4Service {

  constructor(private readonly _http: HttpClient) { }

  generage(frmDate: String, toDate: string): Observable<Report4[]> {
    return this._http.get<Report4[]>(`${URLAPI}/issue/report4/${frmDate}/${toDate}`);
  }
}

export interface Report4 {
  status: string;
  total: number;
}