import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private readonly http: HttpClient) { }

  finAll(): Observable<Department[]> {
    return this.http.get<Department[]>(`${URLAPI}/department`);
  }

  save(payload: Department): Observable<any> {
    if(payload.id == 0) {
      return this.http.post<any>(`${URLAPI}/department`, payload);
    } else {
      return this.http.put<any>(`${URLAPI}/department/${payload.id}`, payload);
    }
  }
}

export interface Department {
  id: number;
  code: string;
  name: string;
}
