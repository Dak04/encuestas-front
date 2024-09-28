import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private apiUrl = 'http://localhost:8080/demo/guardarencuesta'; // La URL del backend

  constructor(private http: HttpClient) {}

  submitSurvey(email: string, musicStyle: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = `respuesta=${musicStyle}&email=${email}`; // Formato para el cuerpo de la solicitud

    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' });
  }
}
