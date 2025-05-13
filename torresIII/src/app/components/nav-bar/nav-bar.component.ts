import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar', 
  templateUrl: './nav-bar.component.html', 
  styleUrls: ['./nav-bar.component.css'] 
})
export class NavBarComponent implements OnInit, OnDestroy {
  breadcrumbItems: { name: string, link: string }[] = [];
  private routeSub: Subscription | undefined;
  showScrollButton: boolean = false;
  showBackButton: boolean = true;
  showSiteMapButton: boolean = false;

  // 🔍 Variables del buscador
  searchKeyword: string = '';
  siteMap = [
    { name: 'Inicio', link: '/home' },
    { name: 'Lista de Eventos', link: '/totalEventos' },
    { name: 'Registro de Persona', link: '/regisPersona' },
    { name: 'Agregar Eventos', link: '/listEventos' },
    { name: 'Contacto', link: '/contacto' },
    { name: 'Mapa del Sitio', link: '/site-map' }
  ];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setBreadcrumbs();
        this.updateButtonsVisibility();
      });

    this.setBreadcrumbs();
    this.updateButtonsVisibility();
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  private setBreadcrumbs(): void {
    this.breadcrumbItems = [];

    if (this.router.url === '/' || this.router.url === '/home') {
      return;
    }

    let currentRoute = this.activatedRoute.root;
    let url = '';

    while (currentRoute.children.length > 0) {
      const childRoute = currentRoute.children[0];
      const routeConfig = childRoute.routeConfig;

      if (routeConfig && routeConfig.path) {
        url += `/${routeConfig.path}`;
        this.breadcrumbItems.push({
          name: this.formatBreadcrumb(routeConfig.path),
          link: url
        });
      }

      currentRoute = childRoute;
    }

    this.breadcrumbItems.unshift({ name: 'Inicio', link: '/home' });
  }

  private formatBreadcrumb(path: string): string {
    return path.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  goBack(): void {
    window.history.back();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private updateButtonsVisibility(): void {
    this.showBackButton = this.router.url !== '/' && this.router.url !== '/home' && this.router.url !== '/site-map';
    this.showSiteMapButton = this.router.url === '/' || this.router.url === '/home';
  }

  @HostListener("window:scroll", [])
  onWindowScroll(): void {
    this.showScrollButton = window.scrollY > 300;
  }

  // 🔍 Función para buscar y redirigir
  searchAndNavigate(): void {
    const foundItem = this.siteMap.find(item =>
      item.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) // Usa includes() para búsquedas parciales
    );
  
    if (foundItem) {
      this.router.navigateByUrl(foundItem.link);
    } else {
      this.router.navigateByUrl('/error'); // Redirige a la página de error si no encuentra nada
    }
  
    this.searchKeyword = ''; // Limpiar la búsqueda después de enviar
  }
  
}
