import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/admin/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
