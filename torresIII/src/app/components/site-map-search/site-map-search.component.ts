import { Component } from '@angular/core';

@Component({
  selector: 'app-site-map-search',
  templateUrl: './site-map-search.component.html',
  styleUrls: ['./site-map-search.component.css']
})
export class SiteMapSearchComponent {
  searchKeyword: string = ''; 
  siteMap = [
    { name: 'Inicio', link: '/home' },
    { name: 'Lista de Eventos', link: '/totalEventos' },
    { name: 'Registro de Persona', link: '/regisPersona' },
    { name: 'Agregar Eventos', link: '/listEventos' },
    { name: 'Contacto', link: '/contacto' },
    { name: 'Mapa del Sitio', link: '/site-map' }
  ];

  filteredResults = [...this.siteMap]; 

  filterResults() {
    this.filteredResults = this.siteMap.filter(item =>
      item.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}
