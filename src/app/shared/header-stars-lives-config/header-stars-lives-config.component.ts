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
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    if (this.userId) {
      this.startPhaseService.carregarVidasDoBackend(this.userId);
      this.startPhaseService.getVidas().subscribe(vidas => {
        this.vidas = vidas;
      });

      this.startPhaseService.carregarEstrelasDoBackend(this.userId).subscribe(estrelas => {
        this.estrelas = estrelas;
      });

      this.iniciarTemporizador();
    }
  }

  iniciarTemporizador(): void {
    this.timerInterval = setInterval(() => {
        this.startPhaseService.getTempoRegeneracaoVidas(this.userId!).subscribe(tempo => {
            const [minutos, segundos] = tempo.split(':');
            const segundosFormatados = segundos.padStart(2, '0');
            this.tempoRestante = `00:${segundosFormatados}`;

            if (segundos === '00' && (this.vidas === undefined || this.vidas < 5)) {
                setTimeout(() => {
                    this.startPhaseService.buscarVidasDoBackendSemCache(this.userId!).subscribe(vidas => {
                        this.vidas = vidas;
                        this.cdRef.detectChanges();
                    });
                }, 1000);
            }
        });
    }, 1000);
  }

  toggleTeste() {
    this.isTesteVisible = !this.isTesteVisible;
  }

  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target) && this.isTesteVisible) {
      this.isTesteVisible = false;
    }
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
