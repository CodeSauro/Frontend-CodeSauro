import { Component } from '@angular/core';
import { StartPhaseService } from '../../../service/start-phase.service';
import { HeaderStarsLivesComponent } from '../../../shared/header-stars-lives-config/header-stars-lives-config.component';

@Component({
    selector: 'app-map',
    standalone: true,
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
    imports: [
      HeaderStarsLivesComponent
    ]
})
export class MapComponent {

  constructor(
    private startPhaseService: StartPhaseService,
  ) {}

  public start_phase(phaseId: number) {
    this.startPhaseService.start_phase_service(phaseId);
  }
}

