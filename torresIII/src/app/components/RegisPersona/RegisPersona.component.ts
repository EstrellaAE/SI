  import { MessageService } from 'primeng/api';
  import { PersonaService } from './../../services/persona.service';
  import { CargoService } from './../../services/cargo.service';
  import { Component, OnInit } from '@angular/core';
  import { AreaInteresService } from '../../services/area-interes.service';
  import { CiudadService } from '../../services/ciudad.service';
  import { FormBuilder, Validators } from '@angular/forms';
  import { Persona } from '../../models/persona';

  @Component({
    selector: 'app-RegisPersona',
    templateUrl: './RegisPersona.component.html',
    styleUrl: './RegisPersona.component.css'
  })
  export class RegisPersonaComponent implements OnInit{
    personaForm=this.fb.group({
      nombre:['',[Validators.required]],
      apP:['',[Validators.required]],
      apM:['',[Validators.required]],
      edad:['',[Validators.required]],
      genero:['',[Validators.required]],
      nomArea:['',[Validators.required]],
      correo:['',[Validators.required,Validators.email]],
      telefono:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      nomCargo:['',[Validators.required]],
      ciudad:['',[Validators.required]],
    }
    )

    constructor(
      public areaInteresService:AreaInteresService,
      public ciudadService:CiudadService,
      public cargoService:CargoService,
      public fb:FormBuilder,
      private personaService:PersonaService,
      public messageService:MessageService
    ){}

    ngOnInit(){
      this.getCiudad();
      this.getAreaInteres();
      this.getCargo();
    }

    get nombre() {
      return this.personaForm.get('nombre');
    }
    
    get apP() {
      return this.personaForm.get('apP');
    }
    
    get apM() {
      return this.personaForm.get('apM');
    }
    
    get edad() {
      return this.personaForm.get('edad');
    }
    
    get genero() {
      return this.personaForm.get('genero');
    }
    
    get nomArea() {
      return this.personaForm.get('nomArea');
    }
    
    get correo() {
      return this.personaForm.get('correo');
    }
    
    get telefono() {
      return this.personaForm.get('telefono');
    }
    
    get nomCargo() {
      return this.personaForm.get('nomCargo');
    }
    
    get nomCiudad() {
      return this.personaForm.get('ciudad');
    }  

    getCiudad(){
      this.ciudadService.getCiudad().subscribe(
        (res)=>{
          this.ciudadService.ciudades=res
        },
        (error) => console.error()
      )
    }

    getAreaInteres(){
      this.areaInteresService.getAreaIn().subscribe(
        (res)=>{
          this.areaInteresService.areaInteres=res
        },
        (error)=>console.error()
      )
    }

    getCargo(){
      this.cargoService.getCargo().subscribe(
        (res)=>{
          this.cargoService.cargos=res
        },
        (error)=>console.error()
      )
    }

    aggPersona(){
      const datos={...this.personaForm.value}
      console.log(datos)
      this.personaService.aggPersona(datos as unknown as Persona).subscribe(
        (res:any)=>{
          const {message,code}=res
          this.messageService.add({ 
          severity: 'success', 
          summary: 'Registro Exitosos', 
          detail: message });
          this.personaForm.reset
        },
        (error:any)=>{
          let errorMessage = 'Hubo un error en el registro';
          if (error && error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error en el registro', 
            detail: errorMessage
          });
        }
        )
    }
  }
