import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderHomeComponent } from '../../../shared/header-home/header-home.component';
import { Usuario } from '../../../modules/usuario.module';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    HeaderHomeComponent,
    RouterLink,
    FormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public listaUsuarios: Usuario[] = [];
  public id: any;
  @ViewChild('loginForm') loginForm!: NgForm; // Referência ao formulário de login
  formSubmitted: boolean = false;

  constructor(
    private service: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public auth(login: string, senha: string) {
    this.formSubmitted = true;

    // Chame markFormTouched mesmo se o formulário for inválido
    this.markFormTouched(this.loginForm);

    // Continua mesmo se o formulário for inválido para permitir a tentativa de envio
    this.service.auth({ login, senha }).subscribe(
      res => {
        // Sucesso ao autenticar
        this.router.navigate(['/authenticated/map']);
      },
      error => {
        // Erro ao autenticar
        this.handleAuthError();
      }
    );
  }

  private handleAuthError() {
    // Marcar os campos como inválidos
    this.loginForm.controls['login'].setErrors({'incorrect': true});
    this.loginForm.controls['senha'].setErrors({'incorrect': true});
    // Limpar os campos
    this.loginForm.resetForm();
    // Garantir que a borda vermelha apareça
    this.formSubmitted = true;
  }

  private markFormTouched(form: NgForm) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
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
