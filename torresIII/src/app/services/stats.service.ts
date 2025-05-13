import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatsData } from '../models/stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private baseURL = 'http://localhost:3000/stats/'; // Cambia la URL base según tu configuración

  statsData:StatsData={
    participationByEvent: [],
    globalAttendance: [],
    participacionPorGenero: []
  }

  constructor(private http: HttpClient) { }

  // Método para obtener las estadísticas de participación de un evento específico
  getParticipationStats(evento: string): Observable<StatsData> {
    return this.http.get<StatsData>(this.baseURL+evento);
  }
}
