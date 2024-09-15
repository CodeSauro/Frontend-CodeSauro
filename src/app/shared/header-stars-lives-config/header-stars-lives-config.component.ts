import { Component, ElementRef, OnInit, Renderer2, ChangeDetectorRef } from '@angular/core';
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
  tempoRestante: string = '00:00';
  userId: number | null = null;
  isTesteVisible: boolean = false;
  timerInterval: any;

  constructor(
    private authService: AuthService,
    private startPhaseService: StartPhaseService,
    private renderer: Renderer2,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef // Injetar o ChangeDetectorRef
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

      // Inicializar o temporizador
      this.iniciarTemporizador();
    }
  }

  iniciarTemporizador(): void {
    this.timerInterval = setInterval(() => {
        // Obter o tempo restante para regeneração de vidas
        this.startPhaseService.getTempoRegeneracaoVidas(this.userId!).subscribe(tempo => {
            // Assumindo que o tempo é recebido como 'mm:ss', extraímos minutos e segundos
            const [minutos, segundos] = tempo.split(':');
            const segundosFormatados = segundos.padStart(2, '0'); // Certifica que sempre tem dois dígitos
            this.tempoRestante = `00:${segundosFormatados}`;

            // Atualiza as vidas quando os segundos forem "00" e o número de vidas for menor que 5
            if (segundos === '00' && (this.vidas === undefined || this.vidas < 5)) {
                // Aguardar um pequeno atraso antes de buscar as vidas novamente
                setTimeout(() => {
                    this.startPhaseService.buscarVidasDoBackendSemCache(this.userId!).subscribe(vidas => {
                        // Atualizar vidas de forma que Angular detecte a mudança
                        this.vidas = vidas;
                        this.cdRef.detectChanges(); // Forçar a detecção de mudanças
                    });
                }, 1000); // Atraso de 500ms para garantir a atualização no backend
            }
        });
    }, 1000); // Atualiza a cada segundo
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

  ngOnDestroy(): void {
    // Limpar o temporizador quando o componente for destruído
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
