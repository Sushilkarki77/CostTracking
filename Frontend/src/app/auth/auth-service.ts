import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseItem, TokenRes } from '../common/app.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private apiURl = `${environment.API_URL}auth/`;


  register = (registerCredential: { fullname: string, email: string, password: string }): Observable<ResponseItem<{ email: string, fullname: string }>> => {
    console.log(`${this.apiURl}register`)
    return this.httpClient.post<ResponseItem<{ email: string, fullname: string }>>(`${this.apiURl}register`, registerCredential);
  }
    
  login = (credential: { email: string, password: string }): Observable<ResponseItem<TokenRes>> =>
    this.httpClient.post<ResponseItem<TokenRes>>(`${this.apiURl}login`, credential);

  refresh = (refreshToken: string): Observable<ResponseItem<TokenRes>> => {
    return this.httpClient.post<ResponseItem<TokenRes>>(`${this.apiURl}refresh-token`, { refreshToken });
  }

  logout(){
    this.router.navigate(['auth/login'])
  }
}
