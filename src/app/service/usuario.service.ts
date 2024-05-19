import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modules/usuario.module';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  public post(
    nome: string,
    apelido: string,
    email: string,
    telefone: string,
    senha: string
  ):Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}usuarios`, {
      nome: nome,
      apelido: apelido,
      email: email,
      telefone: telefone,
      senha: senha
    }).pipe (
      res => res,
      error => error
    )
  }
}
