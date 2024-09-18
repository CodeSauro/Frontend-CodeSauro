import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressBarService } from '../../service/progress-bar.service';
import { StartPhaseService } from '../../service/start-phase.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header-phases',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header-phases.component.html',
  styleUrls: ['./header-phases.component.scss']
})
export class HeaderPhasesComponent implements OnInit {

  progress: number = 0;
  vidas?: number;
  userId: number | null = null;
  showLeaveContainer: boolean = false;

  constructor(
    private progressBarService: ProgressBarService,
    private router: Router,
    private startPhaseService: StartPhaseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.progressBarService.currentProgress.subscribe(progress => {
      this.progress = progress;
    });

    this.userId = this.authService.getUserIdFromToken();
    if (this.userId) {
      this.startPhaseService.carregarVidasDoBackend(this.userId);
      this.startPhaseService.getVidas().subscribe(vidas => {
        this.vidas = vidas;
      });
    }
  }

  public leave(): void {
    this.showLeaveContainer = true;
  }

  public continueActivity(): void {
    this.showLeaveContainer = false;
  }

  public exit(): void {
    if (this.userId) {
      this.startPhaseService.retomarRegeneracaoVidas(this.userId).subscribe(() => {
        this.progressBarService.setCurrentPage(1);
        this.router.navigate(['/authenticated/map']);
      }, error => {
        console.error('Erro ao retomar regeneração de vidas:', error);
      });
    }
  }
}
