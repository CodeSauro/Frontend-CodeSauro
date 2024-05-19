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

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  public logout() {
    localStorage.removeItem('access_token');
  }

  public GetUsuario(): Observable<Array<Usuario>> {
    return this.http.get<Array<Usuario>>(`${this.url}auth`);
  }

  public buscarPorId(id: number): Observable<Usuario> {
    const url = `${this.url}auth/${id}`;
    return this.http.get<Usuario>(url);
  }
}
