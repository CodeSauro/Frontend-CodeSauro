import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { HeaderAuthHomeComponent } from '../../../shared/header-auth-home/header-auth-home.component';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    HeaderAuthHomeComponent,
    FormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  @ViewChild('loginForm') loginForm!: NgForm;
  formSubmitted: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public redefinirSenha() {
    this.formSubmitted = true;
    this.markFormTouched(this.loginForm);

    const tokenControl = this.loginForm.controls['token'];
    const novaSenhaControl = this.loginForm.controls['novaSenha'];

    const token = tokenControl.value;
    const novaSenha = novaSenhaControl.value;

    if (this.loginForm.valid) {
      const dados = { token, novaSenha };

      this.usuarioService.redefinirSenha(dados).subscribe(
        () => {
          this.router.navigate(['/password-changed']);
        },
        error => {
          this.handleAuthError();
        }
      );
    }
  }

  private markFormTouched(form: NgForm) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  private handleAuthError() {
    const tokenControl = this.loginForm.controls['token'];
    const novaSenhaControl = this.loginForm.controls['novaSenha'];

    tokenControl.reset();
    novaSenhaControl.reset();

    tokenControl.setErrors({ 'incorrect': true });
    novaSenhaControl.setErrors({ 'incorrect': true });

    this.formSubmitted = true;
  }

  senhaVisivel: boolean = false;

  togglePasswordVisibility() {
    this.senhaVisivel = !this.senhaVisivel;
  }

  get iconEye() {
    return this.senhaVisivel ? 'icon-eye-close.png' : 'icon-eye.png';
  }

  validarToken(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 6) {
      input.value = input.value.slice(0, 6);
    }
  }

  onBlur(token: any): void {
    token.control.markAsTouched();
  }

}
