import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProgressBarService } from '../../../../service/progress-bar.service';

@Component({
  selector: 'app-one-star',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './one-star.component.html',
  styleUrl: './one-star.component.scss'
})
export class OneStarComponent {

  constructor(
    private router: Router,
    private progressBarService: ProgressBarService,
  ) {}

  close() {
    this.progressBarService.setCurrentPage(1);
    this.router.navigate(['authenticated/map']);
  }
}
