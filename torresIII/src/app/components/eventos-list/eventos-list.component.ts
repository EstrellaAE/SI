import { Component, OnInit } from '@angular/core';
import { EventosService } from './../../services/eventos.service';
import { CiudadService } from './../../services/ciudad.service';
import { AreaInteresService } from './../../services/area-interes.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Evento } from '../../models/eventos';

@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  styleUrls: ['./eventos-list.component.css']
})
export class EventosListComponent implements OnInit {
  eventForm = this.fb.group({
    nombreEvento: ['', [Validators.required]],
    cupoMaximo: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    nomCiudad: ['', [Validators.required]],
    nomArea: ['', [Validators.required]]
  });

  searchKeyword: string = '';
  eventos: Evento[] = [];
  filteredEvents: Evento[] = [];

  constructor(
    private eventosService: EventosService,
    public fb: FormBuilder,
    private messageService: MessageService,
    public areaInteresService: AreaInteresService,
    public ciudadService: CiudadService
  ) {}

  ngOnInit(): void {
    this.getCiudad();
    this.getAreaInters();
    this.getEventos();
  }

  get nombreEvento() {
    return this.eventForm.controls['nombreEvento'];
  }

  get cupoMaximo() {
    return this.eventForm.controls['cupoMaximo'];
  }

  get fecha() {
    return this.eventForm.controls['fecha'];
  }

  get nomArea() {
    return this.eventForm.controls['nomArea'];
  }

  get nomCiudad() {
    return this.eventForm.controls['nomCiudad'];
  }

  getCiudad() {
    console.log('Petición GET a:', this.ciudadService.URL);
    this.ciudadService.getCiudad().subscribe(
      (res) => {
        this.ciudadService.ciudades = res;
      },
      (error) => console.error('Error cargando ciudades:', error)
    );
  }

  getAreaInters() {
    console.log('Petición GET a:', this.areaInteresService.URL_API);
    this.areaInteresService.getAreaIn().subscribe(
      (res) => {
        this.areaInteresService.areaInteres = res;
      },
      (error) => console.error('Error cargando áreas:', error)
    );
  }

  getEventos() {
    this.eventosService.getEvents().subscribe(
      (res: Evento[]) => {
        this.eventos = res;
        this.filteredEvents = res;
      },
      (error) => console.error('Error cargando eventos:', error)
    );
  }

  filterEvents() {
    if (this.searchKeyword) {
      this.filteredEvents = this.eventos.filter((event) =>
        event.nombreEvento.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        event.nomArea.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        event.nomCiudad.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      this.filteredEvents = this.eventos;
    }
  }

  aggEvento() {
    const datos = { ...this.eventForm.value };
    console.log('Datos enviados:', datos);
    this.eventosService.agEvento(datos as unknown as Evento).subscribe(
      (res: any) => {
        const { message } = res;
        this.messageService.add({
          severity: 'success',
          summary: 'Registro Exitoso',
          detail: message
        });
        this.eventForm.reset();
        this.getEventos();
      },
      (error: any) => {
        let errorMessage = 'Hubo un error en el registro';
        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error en el registro',
          detail: errorMessage
        });
      }
    );
  }
}
