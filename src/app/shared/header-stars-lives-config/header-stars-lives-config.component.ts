import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StartPhaseService } from '../../service/start-phase.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-stars-lives-config',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './header-stars-lives-config.component.html',
  styleUrls: ['./header-stars-lives-config.component.scss']
})
export class HeaderStarsLivesComponent implements OnInit {

  estrelas: number = 0;
  vidas?: number;
  tempoRestante: string = '00:00:00';
  userId: number | null = null;
  isTesteVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private startPhaseService: StartPhaseService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    if (this.userId) {
      // Carregar as vidas do backend
      this.startPhaseService.carregarVidasDoBackend(this.userId);

      // Observar as vidas e atualizar
      this.startPhaseService.getVidas().subscribe(vidas => {
        this.vidas = vidas;
      });

      // Carregar as estrelas do backend
      this.startPhaseService.carregarEstrelasDoBackend(this.userId).subscribe(estrelas => {
        this.estrelas = estrelas;
      });

      // Obter o tempo restante para regeneração de vidas
      this.startPhaseService.getTempoRegeneracaoVidas(this.userId).subscribe(tempo => {
        this.tempoRestante = tempo;  // Atualiza o tempo de regeneração
      });
    }
  }

  // Método para alternar a visibilidade da div teste
  toggleTeste() {
    this.isTesteVisible = !this.isTesteVisible;
  }

  // Método para detectar clique fora da div
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target) && this.isTesteVisible) {
      this.isTesteVisible = false;
    }
  }
}
