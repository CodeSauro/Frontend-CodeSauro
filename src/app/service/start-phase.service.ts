import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StartPhaseService {

  constructor(
    private router: Router,
  ) { }

  public start_phase_service() {
    this.router.navigate(['/authenticated/phases/explaining-phase']);
  }
}
