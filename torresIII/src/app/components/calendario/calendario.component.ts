import { EventosService } from './../../services/eventos.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  eventInfoVisible: boolean = false;
  selectedEvent: any;
  

  week: any = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];

  monthSelect: any[] = [];
  dateSelect: any;
  dateValue: any = new Date();



  constructor(public eventosService:EventosService) {}

  ngOnInit(): void {
    const fechaActual = new Date();
    const mes = fechaActual.getMonth();
    const año = fechaActual.getFullYear();
    this.getDaysFromDate(mes + 1, año);
    this.getEventos();
  }

  ngAfterViewInit() {
    // Este método se ejecutará después de que la vista se haya inicializado
    // Puedes usar mapContainer de forma segura aquí
  }

  getEventos(): void {
    this.eventosService.getEvents().subscribe(
      (res) => {
        this.eventosService.eventos = res;
        console.log(this.eventosService.eventos);
      },
      (error) => console.log(error)
    );
  }

  hasEvent(day: any): boolean {
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day?.value.toString().padStart(2, '0')}`;
    return this.eventosService.eventos.some((evento) => evento.fecha.startsWith(parse));
  }

  hoy(day: any): boolean {
    const hoy = new Date();
    hoy.setDate(hoy.getDate());
    const diaStr = hoy.toISOString().slice(0, 10);
    const dia = `${diaStr}`;
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day?.value.toString().padStart(2, '0')}`;

    if (dia === parse) {
      return true;
    }
    return false;
  }

  getDaysFromDate(month: number, year: number) {
    const startDate = moment.utc(`${year}/${month}/02`);
    const endDate = startDate.clone().endOf('month');
    console.log(endDate)
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays+1);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a +1}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day: { value: any }) {
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value.toString().padStart(2, '0')}`;
    const objectDate = moment.utc(parse);
    this.dateValue = objectDate;
    console.log(this.dateSelect);
    const fechaSelect= new Date(this.dateValue)

    this.eventosService.getByDate(fechaSelect).subscribe(
      eventosDia=>{
        this.eventosService.eventosdia=eventosDia;
        console.log(this.eventosService.eventosdia)
        if (this.eventosService.eventosdia.length > 0) {
          this.eventInfoVisible = true
        } else {
          this.eventInfoVisible = false
        }
      }
    )

    console.log(day);
  }

  cerrarInfoEvent() {
    this.eventInfoVisible = !this.eventInfoVisible;
  }
}


