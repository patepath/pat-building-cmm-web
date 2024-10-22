import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private readonly _http: HttpClient) { }

  findAll(): Observable<Group[]> {
    return this._http.get<Group[]>(`${URLAPI}/group`);
  }

  save(payload: Group): Observable<any> {
    if(payload.id == 0) {
      return this._http.post(`${URLAPI}/group`,payload);
    } else {
      return this._http.put(`${URLAPI}/group/${payload.id}`,payload);
    }
  }
}

export interface Group {
  id: number;
  code: string;
  name: string;
}