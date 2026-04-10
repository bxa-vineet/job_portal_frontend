import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest, LoginResponse } from './auth.model';
import { Observable } from 'rxjs';
import Stream from 'stream';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data);
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data,{
      responseType : 'text'
    });
  }

  validateToken(): Observable<any> {
    return this.http.get(`${this.baseUrl}/validate`);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
   
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.roles && payload.roles.length > 0) {
        console.log("Vineet hsgioacav");
        console.log(payload.roles);
        localStorage.setItem('role', payload.roles);
      }
    } catch (error) {
      console.error('Invalid token format', error);
    }
  }

  // saveUserInfo(response: LoginResponse) {
  //   localStorage.setItem('userInfo', JSON.stringify({
  //     username: response.username,
  //     name: response.name,
  //     email: response.email,
  //     roles: response.roles
  //   }));
  // }

  getUserInfo() {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  getUserRole(): string | null {
    const userInfo = this.getUserInfo();
    return userInfo?.roles?.[0] || null;
  }

  getUserName(): string | null {
    const userInfo = this.getUserInfo();
    return userInfo?.name || null;
  }

  getUserEmail(): string | null {
    const userInfo = this.getUserInfo();
    return userInfo?.email || null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userInfo');
  }
}