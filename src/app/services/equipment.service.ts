import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Group } from './group.service';

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private readonly _http: HttpClient) { }

  findAll(): Observable<Equipment[]> {
    return this._http.get<Equipment[]>(`${URLAPI}/equipment`);
  }

  findByGroup(groupid: number): Observable<Equipment[]> {
    return this._http.get<Equipment[]>(`${URLAPI}/equipment/find-by-group/${groupid}`);
  }

  save(payload: Equipment): Observable<any> {
    if(payload.id == 0) {
      return this._http.post(`${URLAPI}/equipment`, payload)
    } else {
      return this._http.put(`${URLAPI}/equipment/${payload.id}`, payload)
    }
  }
}

export interface Equipment {
  id: number;
  code: string;
  name: string;
  group: Group | undefined;
}