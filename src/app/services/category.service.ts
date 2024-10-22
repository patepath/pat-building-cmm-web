import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${URLAPI}/category`);
  }

  save(payload: Category): Observable<any> {
    if(payload.id == 0) {
      return this.http.post<any>(`${URLAPI}/category`, payload);
    } else {
      return this.http.put<any>(`${URLAPI}/category/${payload.id}`, payload);
    }
  }
}

export interface Category {
  id: number;
  code: string;
  name: string;
}