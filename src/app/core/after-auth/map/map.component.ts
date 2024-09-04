import { UsuarioService } from './../../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { StartPhaseService } from '../../../service/start-phase.service';
import { HeaderStarsLivesComponent } from '../../../shared/header-stars-lives-config/header-stars-lives-config.component';
import { UsuarioProgresso } from '../../../modules/usuario-progresso.module';
import { CommonModule } from '@angular/common';

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

  constructor(
    private startPhaseService: StartPhaseService,
  ) {}

  ngOnInit() {
    this.loadProgress();
  }

  private loadProgress() {
    const userId = 1;
    this.startPhaseService.getUserProgress(userId).subscribe(
      progressos => {
        this.progressos = progressos;
      }
    );
  }

  public start_phase(phaseId: number) {
    const fase = this.progressos.find(p => p.faseId === phaseId);
    if (fase && !fase.bloqueada) {
      this.startPhaseService.startPhaseService(phaseId);
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
