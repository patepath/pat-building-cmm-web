import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class Report2Service {

  constructor(private readonly _http: HttpClient) { }

  generage(frmDate: String, toDate: string): Observable<Report2[]> {
    return this._http.get<Report2[]>(`${URLAPI}/issue/report2/${frmDate}/${toDate}`);
  }
}

export interface Report2 {
  deptname: string;
  total: number;
}
