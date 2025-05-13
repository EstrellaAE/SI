import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';


const modPrimeNg:any=[
  ButtonModule,
  CardModule,
  InputTextModule,
  MenubarModule,
  PasswordModule,
  ToastModule,
  DialogModule,
  CalendarModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modPrimeNg
  ],
  exports:[
    modPrimeNg
  ]
})
export class PrimengModule { }
