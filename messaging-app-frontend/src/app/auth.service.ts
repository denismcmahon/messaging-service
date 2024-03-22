import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<any>(loginUrl, { email, password}).pipe(
      catchError(error => {
        console.error('Login failed:', error);
        return of(null); // return null in case of error
      })
    );
  }

  register(userData: any): Observable<any> {
    const registerUrl = `${this.apiUrl}/register`;
    return this.http.post<any>(registerUrl, userData).pipe(
      catchError(error => {
        console.error('Login failed:', error);
        return of(null); // return null in case of error
      })
    );
  }
}
