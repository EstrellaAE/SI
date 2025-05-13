import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  humanVerified: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    if (!this.humanVerified) {
      this.error = 'Por favor, verifica que no eres un robot.';
      return;
    }

    const body = { email: this.email, password: this.password };

    this.http.post<any>('http://localhost:3000/api/auth/login', body).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        localStorage.setItem('token', res.token); // ✅ Token real del backend
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.error = err.error.message || 'Error al iniciar sesión.';
      }
    });
  }
}
