import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Issue } from './issue.service';

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(private readonly _http: HttpClient) { }

  save(payload: Part): Observable<any> {
    return this._http.post(`${URLAPI}/part`, payload)
  }

  findAll(): Observable<Part[]> {
    return this._http.get<Part[]>(`${URLAPI}/part`);
  }

  findByIssue(issueid: number): Observable<Part[]> {
    return this._http.get<Part[]>(`${URLAPI}/part/issue/${issueid}`);
  }

  deleteByIssue(issueid: number): Observable<any> {
    return this._http.delete(`${URLAPI}/part/issue/${issueid}`);
  }
}

export interface Part {
  id: number;
  code: string;
  name: string;
  qty: number;
  unit: string;
  issueId: number;
}