import { UsuarioService } from './../../../service/usuario.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderHomeAuthComponent } from '../../../shared/header-home-auth/header-home-auth.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HeaderHomeAuthComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  public post(
    nome: string,
    apelido: string,
    email: string,
    telefone: string,
    senha: string
  ) {
    return this.usuarioService.post(
      nome,
      apelido,
      email,
      telefone,
      senha
    ).subscribe(
      res => {
        console.log('Resposta ', res);
      },
      error => {
        console.error('Erro ', error);
      }
    )
  }

  @ViewChild('senha') senhaInput!: ElementRef;
  senhaVisivel: boolean = false;

  togglePasswordVisibility() {
    this.senhaVisivel = !this.senhaVisivel;
    const input = this.senhaInput.nativeElement;
    input.type = this.senhaVisivel ? 'text' : 'password';
  }

  get iconEye() {
    return this.senhaVisivel ? 'icon-eye-close.png' : 'icon-eye.png';
  }

}
