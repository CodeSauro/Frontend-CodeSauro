import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressBarService } from '../../service/progress-bar.service';

@Component({
  selector: 'app-header-phases',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header-phases.component.html',
  styleUrl: './header-phases.component.scss'
})
export class HeaderPhasesComponent implements OnInit {

  public progress: number = 0;

  constructor(
    private progressBarService: ProgressBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.progressBarService.currentProgress.subscribe(progress => {
      this.progress = progress;
    });
  }

  public leave() {
    this.progressBarService.setCurrentPage(1);
    this.router.navigate(['/authenticated/map']);
  }
}
