import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtPayload, NewUser, User } from '../../interfaces/user';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:5182';
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`/api/account/login`, { username, password })
      .pipe(
        tap((res) => {
          console.log('getting response');
          console.log(res);
          this.setSession(res);
        }),
        shareReplay(1)
      );
  }

  signup(newUser: NewUser): Observable<User> {
    return this.http.post<User>('/api/account/register', newUser).pipe(
      tap((res) => {
        this.setSession(res);
      }),
      shareReplay(1)
    );
  }

  private setSession(authResult: User): void {
    localStorage.setItem('username', authResult.username);
    localStorage.setItem('email', authResult.email);
    localStorage.setItem('token', authResult.token);
  }

  isLoggedIn() {
    return this.isTokenValid;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  decodeToken(token: string): JwtPayload {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('Invalid JWT token format.');
    }

    const payload = JSON.parse(atob(parts[1]));
    return payload as JwtPayload;
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const payload = this.decodeToken(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp < currentTime) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
