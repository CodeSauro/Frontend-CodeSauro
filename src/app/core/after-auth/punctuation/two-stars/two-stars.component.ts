import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProgressBarService } from '../../../../service/progress-bar.service';

@Component({
  selector: 'app-two-stars',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './two-stars.component.html',
  styleUrl: './two-stars.component.scss'
})
export class TwoStarsComponent {

  constructor(
    private router: Router,
    private progressBarService: ProgressBarService,
  ) {}

  close() {
    this.progressBarService.setCurrentPage(1);
    this.router.navigate(['authenticated/map']);
  }
}
