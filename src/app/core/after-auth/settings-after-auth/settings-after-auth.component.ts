import { Component, OnInit } from '@angular/core';
import { HeaderMapComponent } from '../../../shared/header-map/header-map.component';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../service/usuario.service';
import { Usuario } from '../../../modules/usuario.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-after-auth',
  standalone: true,
  imports: [
    HeaderMapComponent,
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './settings-after-auth.component.html',
  styleUrls: ['./settings-after-auth.component.scss']
})
export class SettingsAfterAuthComponent implements OnInit {

  showLeaveContainer: boolean = false;
  nome?: string;
  apelido?: string;
  estrelas?: number;
  userId: number | null = null;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserIdFromToken();
    if (this.userId) {
      this.loadUserData();
    }
  }

  private loadUserData(): void {
    if (this.userId) {
      this.usuarioService.getUserById(this.userId).subscribe(
        (usuario: Usuario) => {
          this.nome = usuario.nome;
          this.apelido = usuario.apelido;
          this.estrelas = usuario.estrelas;
        },
        (error) => {
          console.error('Erro ao carregar os dados do usuário:', error);
        }
      );
    }
  }

  public showLeave(): void {
    this.showLeaveContainer = true;
  }

  public continueActivity(): void {
    this.showLeaveContainer = false;
  }

  public exit(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
