import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URLAPI = environment.urlapi;


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private readonly _http: HttpClient) { }

  
  findAll(): Observable<Type[]> {
    return this._http.get<Type[]>(`${URLAPI}/type`);
  }

  save(payload: Type): Observable<any> {
    if(payload.id == 0) {
      return this._http.post(`${URLAPI}/type`,payload);
    } else {
      return this._http.put(`${URLAPI}/type/${payload.id}`,payload);
    }
  }
}

export interface Type {
  id: number;
  code: string;
  name: string;
}