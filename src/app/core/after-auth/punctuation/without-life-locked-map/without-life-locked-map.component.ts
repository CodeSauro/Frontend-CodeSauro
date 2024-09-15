import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProgressBarService } from '../../../../service/progress-bar.service';
import { AuthService } from '../../../../service/auth.service';
import { StartPhaseService } from '../../../../service/start-phase.service';

@Component({
  selector: 'app-without-life-locked-map',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './without-life-locked-map.component.html',
  styleUrl: './without-life-locked-map.component.scss'
})
export class WithoutLifeLockedMapComponent implements OnInit{

  userId: number | null = null;

  constructor(
    private authService: AuthService,
    private startPhaseService: StartPhaseService,
    private progressBarService: ProgressBarService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
  }

  public close(): void {
    if (this.userId) {
      this.startPhaseService.retomarRegeneracaoVidas(this.userId).subscribe(() => {
        this.progressBarService.setCurrentPage(1);
        this.router.navigate(['/authenticated/map']);
      });
    }
  }
}
