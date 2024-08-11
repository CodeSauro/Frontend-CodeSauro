import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressBarService } from './progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class StartPhaseService {

  constructor(
    private router: Router,
    private progressBarService: ProgressBarService
  ) { }

  public start_phase_service(phaseId: number) {
    this.progressBarService.resetProgress();
    this.router.navigate(['/authenticated/phases/explaining-phase', phaseId]);
  }
}
