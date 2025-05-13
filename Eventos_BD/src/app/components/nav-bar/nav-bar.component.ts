import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar', 
  templateUrl: './nav-bar.component.html', 
  styleUrls: ['./nav-bar.component.css'] 
})
export class NavBarComponent implements OnInit, OnDestroy {
  searchKeyword: string = '';
  currentRoute: string = '';
  breadcrumbItems: { name: string, link: string }[] = [];
  private routeSub: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Suscríbete a los cambios de ruta para actualizar las migas de pan
    this.routeSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setBreadcrumbs();
      }
    });
    this.setBreadcrumbs();  // Establecer las migas de pan al inicializar el componente
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();  // Desuscribirse cuando el componente se destruya
    }
  }

  setBreadcrumbs(): void {
    this.currentRoute = this.router.url;

    // Configura las migas de pan según la ruta activa
    if (this.currentRoute === '/home') {
      this.breadcrumbItems = [
        { name: 'Inicio', link: '/home' },
        { name: 'Eventos', link: '/totalEventos' }
      ];
    } else if (this.currentRoute === '/regisPersona') {
      this.breadcrumbItems = [
        { name: 'Inicio', link: '/home' },
        { name: 'Registrarse', link: '/regisPersona' }
      ];
    } else if (this.currentRoute === '/totalEventos') {
      this.breadcrumbItems = [
        { name: 'Inicio', link: '/home' },
        { name: 'Lista de Eventos', link: '/totalEventos' }
      ];
    } else if (this.currentRoute === '/listEventos') {
      this.breadcrumbItems = [
        { name: 'Inicio', link: '/home' },
        { name: 'Agregar Eventos', link: '/listEventos' }
      ];
    } else {
      this.breadcrumbItems = [
        { name: 'Inicio', link: '/home' }
      ];
    }
  }

  filterEvents(): void {
    // Implementa la lógica de filtrado de eventos si es necesario.
  }
}
