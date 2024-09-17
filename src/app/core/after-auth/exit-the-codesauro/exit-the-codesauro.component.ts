import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { StartPhaseService } from '../../../service/start-phase.service';
import { ProgressBarService } from '../../../service/progress-bar.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-exit-the-codesauro',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './exit-the-codesauro.component.html',
  styleUrl: './exit-the-codesauro.component.scss'
})
export class ExitTheCodesauroComponent {

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

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
