import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiBaseService {
  private base = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.base}/${path}`);
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.base}/${path}`, body);
  }

  put<T>(path: string, id: number | string, body: any): Observable<T> {
    return this.http.put<T>(`${this.base}/${path}/${id}`, body);
  }

  patch<T>(path: string, id: number | string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.base}/${path}/${id}`, body);
  }

  delete<T>(path: string, id: number | string): Observable<T> {
    return this.http.delete<T>(`${this.base}/${path}/${id}`);
  }
}