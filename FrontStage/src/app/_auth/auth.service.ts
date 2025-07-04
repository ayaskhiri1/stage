import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  router.navigate(['/forbidden']);
  return false;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  isAdmin(): boolean {
    const userData = localStorage.getItem('currentUser');
    if (!userData) return false;
    try {
      const user = JSON.parse(userData);
      return user.role === 'admin';
    } catch {
      return false;
    }
  }

 login(username: string, password: string) {
  let isAuthenticated = false;
  let role = '';

  if (username === 'admin' && password === 'admin123') {
    isAuthenticated = true;
    role = 'admin';
  } else if (username === 'student' && password === 'student123') {
    isAuthenticated = true;
    role = 'user';
  }

  if (isAuthenticated) {
    localStorage.setItem('currentUser', JSON.stringify({ username, role }));
  }

  return of(isAuthenticated);
}


  logout() {
    localStorage.removeItem('currentUser');
  }
}
