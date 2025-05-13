import { Component } from '@angular/core';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css']
})
export class SiteMapComponent {
  searchKeyword: string = '';
  siteMap = [
    { name: 'Inicio', link: '/home' },
    { name: 'Lista de Eventos', link: '/totalEventos' },
    { name: 'Registro de Persona', link: '/regisPersona' },
    { name: 'Agregar Eventos', link: '/listEventos' },
    { name: 'Contacto', link: '/contacto' },
  ];

  filteredResults = [...this.siteMap];

  filterResults() {
    this.filteredResults = this.siteMap.filter(item =>
      item.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );

    // Redirigir automáticamente si hay un solo resultado
    if (this.filteredResults.length === 1) {
      window.location.href = this.filteredResults[0].link;
    }
  }
}
