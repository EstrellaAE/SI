import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      // Decodificar el payload del JWT sin librerías
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < currentTime) {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Token inválido o malformado:', err);
      this.router.navigate(['/login']);
      return false;
    }
    
  }
}
