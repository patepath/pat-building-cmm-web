import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Equipment } from './equipment.service';

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class PartProfileService {

  constructor(private readonly _http: HttpClient) { }

  findAll(): Observable<PartProfile[]> {
    return this._http.get<PartProfile[]>(`${URLAPI}/part-profile`);
  }

  findByEquipment(id: number): Observable<PartProfile[]> {
    return this._http.get<PartProfile[]>(`${URLAPI}/part-profile/equipment/${id}`);
  }

  save(payload: PartProfile): Observable<any> {
    if(payload.id == 0) {
      return this._http.post(`${URLAPI}/part-profile`, payload);
    }

    return this._http.put(`${URLAPI}/part-profile/${payload.id}`, payload);
  }
}

export interface PartProfile {
  id: number;
  code: string;
  name: string;
  unit: string;
  equipment: Equipment;
}