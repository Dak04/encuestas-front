import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private apiUrl = 'http://localhost:8080/demo/api/results';  // URL del backend

  constructor(private http: HttpClient) { }

  getResults(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(this.apiUrl);
  }
}
