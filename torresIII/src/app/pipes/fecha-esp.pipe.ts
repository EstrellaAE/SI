import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaEsp'
})
export class FechaEspPipe implements PipeTransform {

  transform(value: string, mostrarDia: boolean = true): string {
    const fecha = new Date(Date.parse(value));
    const day = this.pad(fecha.getUTCDate());
    let month = fecha.toLocaleDateString('es-ES', { month: 'long' });
    month = month.charAt(0).toUpperCase() + month.slice(1);
    const year = fecha.getUTCFullYear();
    
    if (mostrarDia) {
      return `${day}/${month}/${year}`;
    } else {
      return `${month}/${year}`;
    }
  }

  // Esta función agrega un 0 al principio si el número es menor que 10
  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
