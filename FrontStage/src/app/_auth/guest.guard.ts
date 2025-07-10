import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      return true;
    } else {
      // Rediriger vers le bon dashboard en fonction du rôle
      const role = this.authService.getRole(); // Assure-toi que cette méthode existe

      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if (role === 'STUDENT' || role === 'USER') {
        this.router.navigate(['/user']);
      } else {
        this.router.navigate(['/home']); // fallback
      }

      return false;
    }
  }
}
