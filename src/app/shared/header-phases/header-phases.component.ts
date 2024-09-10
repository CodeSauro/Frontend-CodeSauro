import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressBarService } from '../../service/progress-bar.service';
import { StartPhaseService } from '../../service/start-phase.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header-phases',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header-phases.component.html',
  styleUrls: ['./header-phases.component.scss']
})
export class HeaderPhasesComponent implements OnInit {

  progress: number = 0;
  vidas?: number; // Variável que guarda o número de vidas do usuário
  userId: number | null = null;

  constructor(
    private progressBarService: ProgressBarService,
    private router: Router,
    private startPhaseService: StartPhaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Assinando para obter atualizações de progresso
    this.progressBarService.currentProgress.subscribe(progress => {
      this.progress = progress;
    });

    // Obtendo o ID do usuário a partir do token de autenticação
    this.userId = this.authService.getUserIdFromToken();

    // Se o usuário estiver autenticado, carregar as vidas do backend
    if (this.userId) {
      this.startPhaseService.carregarVidasDoBackend(this.userId);

      // Assinando para obter atualizações de vidas
      this.startPhaseService.getVidas().subscribe(vidas => {
        this.vidas = vidas; // Atualiza o número de vidas exibido
      });
    }
  }

  // Função para sair e retornar ao mapa principal
  public leave(): void {
    this.progressBarService.setCurrentPage(1); // Resetando a página atual no progresso
    this.router.navigate(['/authenticated/map']); // Navegando de volta ao mapa
  }
}
