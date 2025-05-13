import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ciudad } from '../models/ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  URL = 'http://localhost:3000/api/ciudades'; // ✅ Fijado

  constructor(private http: HttpClient) {}

  ciudad: Ciudad = { nomCiudad: '' };
  ciudades: Ciudad[] = [];

  getCiudad() {
    return this.http.get<Ciudad[]>(this.URL);
  }
}
