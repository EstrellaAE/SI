import { StatsService } from './../../services/stats.service';
import { AreaInteresService } from './../../services/area-interes.service';
import { ParticipantesService } from './../../services/participantes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ParticipantesPorGenero } from '../../models/participantes-genero';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrl: './participantes.component.css'
})
export class ParticipantesComponent implements OnInit{
[x: string]: any;

  nombreEvento: string='';
  modo:string='default';

  constructor(public participantesService:ParticipantesService,
    private route: ActivatedRoute,
    public areaInteresService:AreaInteresService,
    public statsService:StatsService
    ){}

  ngOnInit():void{

    this.route.paramMap.subscribe(params => {
      this.nombreEvento = params.get('nombreEvento')??'';
    });
    this.getArea();

    this.getPart();
    this.getStats();
  }

  getArea(){
    this.areaInteresService.getAreaIn().subscribe(
      (res)=>{
        this.areaInteresService.areaInteres=res
      },
      (error) => console.error()
    )
  }

  getPart(){
    console.log(this.nombreEvento)
    this.participantesService.getPart(this.nombreEvento as string).subscribe(
      (res) => {
        this.participantesService.participantes = res;
        console.log(res);
      },
      (error) => console.error()
    );
  }

  getParGen(modo:string){
    this.participantesService.getByGenPart(this.nombreEvento as string, modo,'1').subscribe(
      (res) => {
        this.participantesService.participantesMasc = res;
        console.log(res);
      },
      (error) => console.error()
    );

    this.participantesService.getByGenPart(this.nombreEvento as string, modo,'2').subscribe(
      (resp) => {
        this.participantesService.participantesFem = resp;
        console.log(resp);
      },
      (error) => console.error()
    );
  }

  getStats(){
    this.statsService.getParticipationStats(this.nombreEvento).subscribe(data => {
      this.statsService.statsData = data;
    });
  }
}
