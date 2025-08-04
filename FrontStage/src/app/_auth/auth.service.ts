import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private router: Router) { }

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(username: string, password: string): Observable<boolean> {
    const body = { identifier: username, userPassword: password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.apiUrl}/authenticate`, body, { headers }).pipe(
      tap((response) => {
        console.log("Login response:", response);
        localStorage.setItem('token', response.jwtToken);     // sauvegarde le token
        localStorage.setItem('user', JSON.stringify(response.user)); // sauvegarde les infos user
      }),
      map(() => true),
      catchError((error) => {
        console.error('Login failed:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role || payload.roles || payload.authorities;
      if (Array.isArray(role)) {
        return role.includes('ROLE_ADMIN');
      } else if (typeof role === 'string') {
        return role.includes('ROLE_ADMIN');
      }
      return false;
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role || payload.roles || payload.authorities;
      return Array.isArray(role) ? role.join(',') : role;
    } catch {
      return null;
    }
  }
  getCurrentUser(): any {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  isEtudiant(): boolean {
  const role = this.getRole();
  return typeof role === 'string' && role.includes('ROLE_ETUDIANT');
}


}
