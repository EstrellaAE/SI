import { Participante } from './../models/participante';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParticipantesPorGenero } from '../models/participantes-genero';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {
  URL_API='http://localhost:3000/participante/';
  public participante:Participante={nombre:'',fechaRegistro:'',apP:'',apM:''}
  public participante2:ParticipantesPorGenero={
    nomComp: ''
  }

  participantesMasc:ParticipantesPorGenero[]=[];
  participantesFem:ParticipantesPorGenero[]=[];
  participantes: Participante[]=[];

  constructor(private http: HttpClient) { }

  getPart(nomEvento:string){
    return this.http.get<Participante[]>(this.URL_API+nomEvento)
  }

  agPart(asistencia:Participante, nomEvento:string){
    return this.http.post(this.URL_API+nomEvento,asistencia)
  }

  getByGenPart(nomEvento:string,area:string,option:string){
    return this.http.get<ParticipantesPorGenero[]>(this.URL_API+nomEvento+"/"+area+"/"+option)
  }
}
