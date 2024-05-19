import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderHomeComponent } from '../../../shared/header-home/header-home.component';
import { Usuario } from '../../../modules/usuario.module';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    HeaderHomeComponent,
    RouterLink
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  public listaUsuarios: Usuario[] = [];
  public id: any;

  constructor(
    private service: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.service.GetUsuario().subscribe(
      res => {
        this.listaUsuarios = res;
        console.log('Usuários carregados', res);
      },
      error => console.error('Erro ao carregar usuários', error),
    );

    this.service.buscarPorId(this.id).subscribe(
      res => {
        console.log('Usuário encontrado', res);
      },
      error => console.error('Erro ao buscar usuário por ID', error),
    );
  }

  public auth(login: string, senha: string) {
    console.log('Chamando método auth com', { login, senha });
    this.service.auth({ login, senha }).subscribe(
      res => {
        console.log('Resposta da autenticação', res);
      },
      error => {
        console.error('Erro na autenticação', error);
      }
    );
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
