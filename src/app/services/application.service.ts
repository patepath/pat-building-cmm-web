import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor() { }
}

export interface Application {
  currentIssueType: number;
}
