import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderHomeComponent } from '../../../shared/header-home/header-home.component';
import { Usuario } from '../../../modules/usuario.module';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    HeaderHomeComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public listaUsuarios: Usuario[] = [];
  public id: any;

  constructor(
    private service: AuthService,
    private router: Router,
  ) {}

  public auth(login: string, senha: string) {
    console.log('Chamando método auth com', { login, senha });
    this.service.auth({ login, senha }).subscribe(
      res => {
        this.router.navigate(['/authenticated/phases/data-type'])
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
  }

  get iconEye() {
    return this.senhaVisivel ? 'icon-eye-close.png' : 'icon-eye.png';
  }

}
