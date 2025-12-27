import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API } from '../../api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http = inject(HttpClient);
  private TOKEN_KEY = 'auth_token';

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(API.LOGIN, credentials).pipe(
      tap(res => {
        if (res?.token) {
          this.setToken(res.token);
        }
      })
    );
  }

  logout() {
    this.removeToken();
  }
}
