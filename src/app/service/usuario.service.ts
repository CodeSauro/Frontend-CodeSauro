import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modules/usuario.module';
import { RecuperacaoSenha } from '../modules/recuperacao-senha.module';
import { RedefinicaoSenha } from '../modules/redefinicao-senha.module';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = 'https://backend-codesauro.azurewebsites.net/';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      return new HttpHeaders();
    }
  }

  public post(nome: string, apelido: string, email: string, telefone: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}usuarios`, {
      nome,
      apelido,
      email,
      telefone,
      senha
    }, { headers: this.getHeaders() });
  }

  public getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${this.url}usuarios/${id}`,
      { headers: this.getHeaders() }
    );
  }

  public solicitarRecuperacaoSenha(dados: RecuperacaoSenha): Observable<void> {
    return this.http.post<void>(
      `${this.url}usuarios/solicitar-recuperacao`,
      dados
    );
  }

  public redefinirSenha(dados: RedefinicaoSenha): Observable<void> {
    return this.http.put<void>(
      `${this.url}usuarios/redefinir-senha`,
      dados
    );
  }

}
