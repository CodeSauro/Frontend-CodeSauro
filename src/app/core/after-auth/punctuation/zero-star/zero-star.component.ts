import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProgressBarService } from '../../../../service/progress-bar.service';

@Component({
  selector: 'app-zero-star',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './zero-star.component.html',
  styleUrl: './zero-star.component.scss'
})
export class ZeroStarComponent {

  constructor(
    private router: Router,
    private progressBarService: ProgressBarService,
  ) {}

  close() {
    this.progressBarService.setCurrentPage(1);
    this.router.navigate(['authenticated/map']);
  }
}
