import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class Report3Service {

  constructor(private readonly _http: HttpClient) { }

  generage(frmDate: String, toDate: string): Observable<Report3[]> {
    return this._http.get<Report3[]>(`${URLAPI}/issue/report3/${frmDate}/${toDate}`);
  }
}

export interface Report3 {
  groupname: string;
  total: number;
}