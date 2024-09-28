import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicStyleService {
  private apiUrl = 'http://localhost:8080/api/music-styles'; // URL del backend para obtener estilos musicales

  constructor(private http: HttpClient) {}

  getMusicStyles(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
