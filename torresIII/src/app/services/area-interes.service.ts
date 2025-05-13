// area-interes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../models/areaInteres';

@Injectable({
  providedIn: 'root' // 👈 Asegúrate de que esté así
})
export class AreaInteresService {
  URL_API = 'http://localhost:3000/api/areas';

  areaInteres: Area[] = [];

  constructor(private http: HttpClient) {}

  getAreaIn() {
    return this.http.get<Area[]>(this.URL_API);
  }
}
