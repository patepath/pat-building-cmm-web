import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {Md5} from "md5-typescript";

const URLAPI = environment.urlapi;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  login(name: string, password: string): Observable<User> {
    password = Md5.init(password);
    var url = `${URLAPI}/user/${name}/${password}`;
    return this.http.get<User>(url);
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${URLAPI}/user`);
  }

  findAllTech(): Observable<User[]> {
    return this.http.get<User[]>(`${URLAPI}/user/tech`);
  }

  register(payload: User): Observable<any> {
    if(payload.id === 0) {
      return this.http.post(`${URLAPI}/user`, payload)

    } else {
      return this.http.put(`${URLAPI}/user/${payload.id}`, payload)
    }
  }

}

export interface User {
  id: number;
  name: string;
  password: string;
  role: number;
  firstname: string;
  lastname: string;
  position: string;
  status: number;
}