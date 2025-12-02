import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiBaseService {
  private base = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private handleError(err: any) {
    console.error('API ERROR:', err);
    return throwError(() => err);
  }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.base}/${path}`).pipe(catchError(this.handleError));
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.base}/${path}`, body).pipe(catchError(this.handleError));
  }

  put<T>(path: string, id: number | string, body: any): Observable<T> {
    return this.http.put<T>(`${this.base}/${path}/${id}`, body).pipe(catchError(this.handleError));
  }

  patch<T>(path: string, id: number | string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.base}/${path}/${id}`, body).pipe(catchError(this.handleError));
  }

  delete<T>(path: string, id: number | string): Observable<T> {
    return this.http.delete<T>(`${this.base}/${path}/${id}`).pipe(catchError(this.handleError));
  }
}