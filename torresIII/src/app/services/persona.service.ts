import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  URL_API='http://localhost:3000/api/persona';

  constructor(private http: HttpClient) { }

  aggPersona(persona:Persona){
    return this.http.post(this.URL_API,persona)
  }
}
