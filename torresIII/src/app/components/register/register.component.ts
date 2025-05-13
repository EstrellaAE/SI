import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';
  success: string = '';
  humanVerified: boolean = false; // ✅ para el checkbox

  constructor(private authService: AuthService) {}

  register(): void {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.error = 'Todos los campos son obligatorios.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    if (!this.humanVerified) {
      this.error = 'Debes confirmar que no eres un robot.';
      return;
    }

    const newUser = {
      email: this.email,
      password: this.password
    };

    this.authService.register(newUser).subscribe({
      next: (res: any) => {
        this.success = '¡Usuario registrado correctamente!';
        this.error = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.humanVerified = false;
      },
      error: (err) => {
        this.success = '';
        this.error = err.error.message || 'Error al registrar.';
      }
    });
  }
}
