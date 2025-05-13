import { Injectable } from '@angular/core';
import { Evento } from '../models/eventos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private URL_API = 'http://localhost:3000/api/eventos';
  public event: Evento = { 
    id: 0, 
    nombreEvento: '', 
    fecha: '', 
    cupoMaximo: 0, 
    nomCiudad: '', 
    nomArea: '', 
    description: '' 
  };

  eventos:Evento[]=[];
  eventosdia:Evento[]=[];

  constructor(private http: HttpClient) { }

  getEvents(){
    return this.http.get<Evento[]>(this.URL_API)
  }
  getByDate(fechaEvento:Date){
    return this.http.get<Evento[]>(this.URL_API+'eventos/'+fechaEvento)
  }

  agEvento(evento:Evento){
    return this.http.post(this.URL_API,evento)
  }
}
