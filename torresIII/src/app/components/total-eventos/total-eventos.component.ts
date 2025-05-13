import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Participante } from '../../models/participante';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ParticipantesService } from './../../services/participantes.service';
import { EventosService } from './../../services/eventos.service';

@Component({
  selector: 'app-total-eventos',
  templateUrl: './total-eventos.component.html',
  styleUrl: './total-eventos.component.css'
})
export class TotalEventosComponent implements OnInit {
  items: MenuItem[] = [];
  visible: boolean = false;
  evento: string = '';
  mostrarEventos: boolean = true; // <-- NUEVO
  registerForm = this.fb.group({
    nombre: ['', [Validators.required]],
    apP: ['', [Validators.required]],
    apM: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    public eventosService: EventosService,
    private messageService: MessageService,
    public participantesService: ParticipantesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEvents();
  }

  get nombre() { return this.registerForm.controls['nombre']; }
  get apP() { return this.registerForm.controls['apP']; }
  get apM() { return this.registerForm.controls['apM']; }

  getEvents() {
    this.eventosService.getEvents().subscribe(
      (res) => {
        this.eventosService.eventos = res;
        console.log(res);
      },
      (error) => console.error()
    );
  }

  insPart() {
    const datos = { ...this.registerForm.value };
    this.participantesService.agPart(datos as Participante, this.evento).subscribe(
      (response: any) => {
        const { message } = response;
        this.messageService.add({
          severity: 'success',
          summary: 'Registro Exitoso',
          detail: message
        });
        this.registerForm.reset();
        this.visible = false;
        this.getEvents();
      },
      (error: any) => {
        let errorMessage = 'Hubo un error en el registro';
        if (error?.error?.message) {
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

  goToPart(nombreEvento: string) {
    this.router.navigate(['/participantes', nombreEvento]);
  }

  showDialog(eventoN: string) {
    this.evento = eventoN;
    this.visible = true;
  }

  toggleEventos() {
    this.mostrarEventos = !this.mostrarEventos;
  }
}
