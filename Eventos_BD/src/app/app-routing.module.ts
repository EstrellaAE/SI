import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParticipantesComponent } from './components/participantes/participantes.component';


const routes: Routes = [
  //{ path: '', component:  data: { breadcrumb: 'Inicio' } },
  { path: 'participantes', component: ParticipantesComponent, data: { breadcrumb: 'Participantes' } },
  //{ path: 'configuracion', component: ConfiguracionComponent, data: { breadcrumb: 'Configuración' } },
  //{ path: 'reportes', component: ReportesComponent, data: { breadcrumb: 'Reportes' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
