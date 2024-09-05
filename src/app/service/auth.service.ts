import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Usuario } from '../modules/usuario.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  public auth(payload: { login: string, senha: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}auth`, payload).pipe(
      map((res) => {
        if (res.token) {
          localStorage.setItem('access_token', res.token);
        }
        return res;
      })
    );
  }

  public validateToken(token: string): Observable<boolean> {
    return this.http.post<{ isValid: boolean }>(`${this.url}auth/validate-token`, { token }).pipe(
      map(response => response.isValid)
    );
  }

  public getUserIdFromToken(): number | null {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);

    return parsedPayload.id;
  }

  public logout() {
    localStorage.removeItem('access_token');
  }
}
