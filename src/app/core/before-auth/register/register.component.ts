import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms'; 
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

  @ViewChild('registerForm') registerForm!: NgForm;
  formSubmitted: boolean = false;

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
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      this.markFormTouched(this.registerForm);
      return;
    }

    return this.usuarioService.post(
      nome,
      apelido,
      email,
      telefone,
      senha
    ).subscribe(
      res => {
        this.router.navigate(['/registered-user'])
      },
      error => {
        console.error('Erro ', error);
      }
    );
  }

  private markFormTouched(form: NgForm) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  validateTelefone(telefone: NgModel) {
    return telefone.value && telefone.value.length === 11 ? null : { 'invalidTelefone': true };
  }

  @ViewChild('senha') senhaInput!: ElementRef;
  senhaVisivel: boolean = false;

  togglePasswordVisibility() {
    this.senhaVisivel = !this.senhaVisivel;
  }

  get iconEye() {
    return this.senhaVisivel ? 'icon-eye-close.png' : 'icon-eye.png';
  }

  formatTelefone(event: any) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    value = value.substring(0, 11);
    input.value = value;
  }
}
