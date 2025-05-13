import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cargo } from '../models/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private URL = 'http://localhost:3000/api/cargos'; // CORREGIDO

  constructor(private http: HttpClient) {}

  cargo: Cargo = { nomCargo: '' };
  cargos: Cargo[] = [];

  getCargo() {
    return this.http.get<Cargo[]>(this.URL);
  }
}
