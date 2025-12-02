import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/usuarios';
  private tokenKey = 'pb-token';
  private userKey = 'pb-user';
  currentUser: User | null = null;

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

  private restoreSession(): void {
    const token = localStorage.getItem(this.tokenKey);
    const userStr = localStorage.getItem(this.userKey);
    if (token && userStr) {
      this.currentUser = JSON.parse(userStr);
    }
  }

  login(username: string, password: string): Observable<User | null> {
    const url = `${this.api}?username=${username}&password=${password}`;
    return this.http.get<User[]>(url).pipe(
      map(users => users.length ? users[0] : null),
      tap(user => {
        if (user) {
          const token = btoa(`${user.username}:${new Date().toISOString()}`);
          this.currentUser = user;
          localStorage.setItem(this.tokenKey, token);
          localStorage.setItem(this.userKey, JSON.stringify(user));
        }
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUser(): User | null {
    return this.currentUser;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}