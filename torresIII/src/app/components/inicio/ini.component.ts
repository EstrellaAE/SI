import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ini',
  templateUrl: './ini.component.html',
  styleUrls: ['./ini.component.css']
})
export class IniComponent implements OnInit, OnDestroy {
  searchKeyword: string = '';
  filteredEvents: { nombreEvento: string, description: string }[] = [];
  allEvents: { nombreEvento: string, description: string }[] = [
    { nombreEvento: 'Evento 1', description: 'Descripción del evento 1' },
    { nombreEvento: 'Evento 2', description: 'Descripción del evento 2' },
    { nombreEvento: 'Evento 3', description: 'Descripción del evento 3' },
    { nombreEvento: 'Evento 4', description: 'Descripción del evento 4' },
  ];

  tooltipVisible: boolean = false;
  tooltipText: string = '';
  showScrollButton: boolean = false;

  private routeSub: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setBreadcrumbs();
    this.filteredEvents = [...this.allEvents];
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  setBreadcrumbs(): void {}

  filterEvents(): void {
    if (!this.searchKeyword.trim()) {
      this.filteredEvents = [...this.allEvents];
    } else {
      this.filteredEvents = this.allEvents.filter(event =>
        event.nombreEvento.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }

  mostrarTooltip(nombre: string): void {
    this.tooltipText = `📌 ${nombre}`;
    this.tooltipVisible = true;
  }

  ocultarTooltip(): void {
    this.tooltipVisible = false;
  }

  // ✅ Evento de scroll para mostrar botón flotante
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
