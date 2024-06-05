import { Component } from '@angular/core';
import { HeaderMapComponent } from '../../../shared/header-main/header-map.component';
import { StartPhaseService } from '../../../service/start-phase.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    HeaderMapComponent
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  constructor(
    private startPhaseService: StartPhaseService,
  ) {}

  public start_phase() {
    this.startPhaseService.start_phase_service()
  }
}
