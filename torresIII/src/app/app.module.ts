import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng.module';
import { ParticipantesComponent } from './components/participantes/participantes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { EventosListComponent } from './components/eventos-list/eventos-list.component';
import { TotalEventosComponent } from './components/total-eventos/total-eventos.component';
import { FechaEspPipe } from './pipes/fecha-esp.pipe';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { RegisPersonaComponent } from './components/RegisPersona/RegisPersona.component';
import { IniComponent } from './components/inicio/ini.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SiteMapComponent } from './components/site-map/site-map.component';
import { SiteMapSearchComponent } from './components/site-map-search/site-map-search.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VistaEventosComponent } from './components/vista-eventos/vista-eventos.component';
import { NavbarPublicaComponent } from './components/navbar-publica/navbar-publica.component'; 

@NgModule({
  declarations: [
    AppComponent,
    ParticipantesComponent,
    NavBarComponent,
    IniComponent,
    EventosListComponent,
    TotalEventosComponent,
    FechaEspPipe,
    CalendarioComponent,
    RegisPersonaComponent,
    SiteMapComponent,
    SiteMapSearchComponent,
    ErrorPageComponent,
    LoginComponent,
    RegisterComponent,
    VistaEventosComponent,
    NavbarPublicaComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    PrimengModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

