import { Component, OnInit } from '@angular/core';
import { StartPhaseService } from '../../../service/start-phase.service';
import { HeaderStarsLivesComponent } from '../../../shared/header-stars-lives-config/header-stars-lives-config.component';
import { UsuarioProgresso } from '../../../modules/usuario-progresso.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../service/auth.service';

@Component({
    selector: 'app-map',
    standalone: true,
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    imports: [
      HeaderStarsLivesComponent,
      CommonModule
    ]
})
export class MapComponent implements OnInit {

  progressos: UsuarioProgresso[] = [];
  userId: number | null = null;

  constructor(
    private authService: AuthService,
    private startPhaseService: StartPhaseService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserIdFromToken();
    this.progressos = new Array(40).fill({});
    this.loadProgress();
  }

  private loadProgress() {
    if (this.userId) {
      this.startPhaseService.getUserProgress(this.userId).subscribe(
        progressos => {
          if (progressos.length) {
            this.progressos = progressos;

            let faseDesbloqueada = this.progressos.find(p => !p.bloqueada && p.estrelas === 0);

            if (!faseDesbloqueada) {
              const todasCompletas = this.progressos.every(p => p.estrelas > 0);

              if (todasCompletas) {
                faseDesbloqueada = this.progressos.find(p => p.faseId === 40);
              }
            }

            if (faseDesbloqueada) {
              const faseId = faseDesbloqueada.faseId;
              this.scrollParaFase(faseId);
            }
          }
        },
        error => {
          console.error('Erro ao carregar o progresso:', error);
        }
      );
    }
  }

  private scrollParaFase(faseId: number) {
    let sectionId = '';

    if (faseId >= 1 && faseId <= 8) {
      sectionId = 'ra1';
    } else if (faseId >= 9 && faseId <= 16) {
      sectionId = 'ra2';
    } else if (faseId >= 17 && faseId <= 24) {
      sectionId = 'ra3';
    } else if (faseId >= 25 && faseId <= 32) {
      sectionId = 'ra4';
    } else if (faseId >= 33 && faseId <= 40) {
      sectionId = 'ra5';
    }

    const sectionElement = document.querySelector(`.${sectionId}`);
    const ra1Element = document.querySelector('.ra1');

    if (sectionElement && ra1Element) {
      const ra1TopOffset = ra1Element.getBoundingClientRect().top + window.pageYOffset;
      const pageHeight = document.documentElement.scrollHeight;
      const ra1Percentage = (ra1TopOffset / pageHeight) * 100;
      const sectionTopOffset = sectionElement.getBoundingClientRect().top + window.pageYOffset;
      const scrollPosition = sectionTopOffset - (pageHeight * (ra1Percentage / 100));
      window.scrollTo({ top: scrollPosition, behavior: 'auto' });
    }
  }

  public start_phase(phaseId: number) {
    // Verifica se as vidas estão zeradas antes de iniciar a fase
    if (this.startPhaseService.verificarVidasZeradas()) {
      this.startPhaseService.startPhaseService(phaseId);
    } else {
      const fase = this.progressos.find(p => p.faseId === phaseId);
      if (fase && !fase.bloqueada) {
        this.startPhaseService.startPhaseService(phaseId);
      }
    }
  }

  public getBackgroundImage(estrelas?: number): string {
    const estrelasValue = estrelas ?? 0;

    if (estrelasValue == 3) {
      return 'url("../../../../assets/phase-select-gold.png")';
    } else {
      return 'url("../../../../assets/phase-select.png")';
    }
  }

  public getProgressWidth(estrelas?: number): string {
    const estrelasValue = estrelas ?? 0;

    switch (estrelasValue) {
      case 1:
        return '33%';
      case 2:
        return '66%';
      case 3:
        return '100%';
      default:
        return '0%';
    }
  }
}
