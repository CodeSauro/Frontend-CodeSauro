import { Component, ElementRef, ViewChild } from '@angular/core';
import { Usuario } from '../../../modules/usuario.module';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../../../service/usuario.service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HeaderAuthHomeComponent } from '../../../shared/header-auth-home/header-auth-home.component';
import { RecuperacaoSenha } from '../../../modules/recuperacao-senha.module';

@Component({
  selector: 'app-request-recovery',
  standalone: true,
  imports: [
    HeaderAuthHomeComponent,
    RouterLink,
    FormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './request-recovery.component.html',
  styleUrls: ['./request-recovery.component.scss']
})
export class RequestRecoveryComponent {

  public listaUsuarios: Usuario[] = [];
  public id: any;
  @ViewChild('loginForm') loginForm!: NgForm;
  formSubmitted: boolean = false;
  isProcessing: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  public solicitarRecuperacaoSenha() {
    this.formSubmitted = true;
    this.markFormTouched(this.loginForm);
    const emailControl = this.loginForm.controls['email'];
    const email = emailControl.value;

    if (this.loginForm.valid) {
      this.isProcessing = true;

      const dados: RecuperacaoSenha = { email };

      this.usuarioService.solicitarRecuperacaoSenha(dados).subscribe(
        () => {
          this.isProcessing = false;
          this.router.navigate(['/reset-password']);
        },
        error => {
          this.isProcessing = false;
          emailControl.reset();
          emailControl.setErrors({ 'invalid': true });
          console.error('Erro ao solicitar recuperação de senha. Tente novamente.');
        }
      );
    }
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
