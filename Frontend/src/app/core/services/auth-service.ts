import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { verifyToken } from '../app.utils';
import { JwtPayload, ResponseItem, TokenRes } from '../interfaces/app.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private apiURl = `${environment.API_URL}auth/`;
  private accessToken = signal<string | null>(null);
  private refreshToken = signal<string | null>(null);


  get accessTokenVal() {
    return this.accessToken();
  }

  get refreshTokenVal() {
    return this.refreshToken()
  }

  accessTokenEffect = effect(() => {
    const updatedToken = this.accessToken();
    if (updatedToken) {
      localStorage.setItem('accessToken', updatedToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  });



  refreshTokenEffect = effect(() => {
    const updatedToken = this.refreshToken();
    if (updatedToken) {
      localStorage.setItem('refreshToken', updatedToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  });


  register = (registerCredential: { fullname: string, email: string, password: string }): Observable<ResponseItem<{ email: string, fullname: string }>> => {
    return this.httpClient.post<ResponseItem<{ email: string, fullname: string }>>(`${this.apiURl}register`, registerCredential);
  }

  login = (credential: { email: string, password: string }): Observable<ResponseItem<TokenRes>> =>
    this.httpClient.post<ResponseItem<TokenRes>>(`${this.apiURl}login`, credential);

  refresh = (refreshToken: string): Observable<ResponseItem<TokenRes>> => {
    return this.httpClient.post<ResponseItem<TokenRes>>(`${this.apiURl}refresh-token`, { refreshToken });
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken.set(accessToken);
    this.refreshToken.set(refreshToken);
  }

  logout() {
    this.accessToken.set(null);
    this.refreshToken.set(null);
    this.router.navigate(['auth/login'])
  }

  isLoggedIn = (): boolean => {
    const refreshToken = this.refreshToken();

    if (!refreshToken) return false;

    return verifyToken(refreshToken);
  }

  getUser = computed<JwtPayload>(() => {
    const token = this.accessToken();

    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    try {
      return JSON.parse(decoded);
    } catch (e) {
      console.error('Invalid token payload');
      return null;
    }
  })
}
