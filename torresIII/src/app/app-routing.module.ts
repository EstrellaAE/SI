import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParticipantesComponent } from './components/participantes/participantes.component';
import { EventosListComponent } from './components/eventos-list/eventos-list.component';
import { TotalEventosComponent } from './components/total-eventos/total-eventos.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { IniComponent } from './components/inicio/ini.component';
import { RegisPersonaComponent } from './components/RegisPersona/RegisPersona.component';
import { SiteMapComponent } from './components/site-map/site-map.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VistaEventosComponent } from './components/vista-eventos/vista-eventos.component'; // ✅ IMPORTACIÓN FALTANTE
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/eventos-publico', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'eventos-publico', component: VistaEventosComponent }, // Ruta pública
  { path: 'home', component: IniComponent, canActivate: [AuthGuard] },
  { path: 'participantes', component: ParticipantesComponent, canActivate: [AuthGuard] },
  { path: 'listEventos', component: EventosListComponent, canActivate: [AuthGuard] },
  { path: 'totalEventos', component: TotalEventosComponent, canActivate: [AuthGuard] },
  { path: 'participantes/:nombreEvento', component: ParticipantesComponent, canActivate: [AuthGuard] },
  { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuard] },
  { path: 'regisPersona', component: RegisPersonaComponent, canActivate: [AuthGuard] },
  { path: 'site-map', component: SiteMapComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/eventos-publico' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
