import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (success: boolean) => {
        if (success) {
          const targetRoute = this.authService.isAdmin() ? '/admin' : '/user';
          this.router.navigate([targetRoute]);
        } else {
          alert('Invalid credentials');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Login failed. Please try again.');
      }
    });
  }
}
