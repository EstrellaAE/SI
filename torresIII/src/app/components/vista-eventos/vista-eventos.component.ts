import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-vista-eventos',
  templateUrl: './vista-eventos.component.html',
  styleUrls: ['./vista-eventos.component.css']
})
export class VistaEventosComponent implements OnInit {
  searchKeyword: string = '';
  tooltipVisible = false;
  tooltipText = '';
  showScrollButton = false;
  isLoggedIn: boolean = false;

  allEvents = [
    { nombreEvento: 'Evento 1', description: 'Descripción del evento 1' },
    { nombreEvento: 'Evento 2', description: 'Descripción del evento 2' }
  ];

  filteredEvents = [...this.allEvents];

  ngOnInit(): void {
    this.filteredEvents = [...this.allEvents];
    this.checkAuthStatus();
  }

  filterEvents(): void {
    const keyword = this.searchKeyword.trim().toLowerCase();
    this.filteredEvents = keyword
      ? this.allEvents.filter(event =>
          event.nombreEvento.toLowerCase().includes(keyword) ||
          event.description.toLowerCase().includes(keyword)
        )
      : [...this.allEvents];
  }

  mostrarTooltip(nombre: string): void {
    this.tooltipText = `📌 ${nombre}`;
    this.tooltipVisible = true;
  }

  ocultarTooltip(): void {
    this.tooltipVisible = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollButton = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }
}
