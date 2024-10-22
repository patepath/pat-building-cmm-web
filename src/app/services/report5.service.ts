import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class Report5Service {

  constructor(private readonly _http: HttpClient) { }

  generage(frmDate: String, toDate: string): Observable<Report5[]> {
    return this._http.get<Report5[]>(`${URLAPI}/issue/report5/${frmDate}/${toDate}`);
  }

}

export interface Report5 {
  satisfication: string;
  total: number;
}