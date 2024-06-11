import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { HeaderAuthHomeComponent } from '../../../shared/header-auth-home/header-auth-home.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HeaderAuthHomeComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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
        this.router.navigate(['/auth'])
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
  }

  get iconEye() {
    return this.senhaVisivel ? 'icon-eye-close.png' : 'icon-eye.png';
  }

}
