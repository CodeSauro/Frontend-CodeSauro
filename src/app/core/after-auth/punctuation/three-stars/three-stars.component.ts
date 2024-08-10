import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProgressBarService } from '../../../../service/progress-bar.service';

@Component({
  selector: 'app-three-stars',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './three-stars.component.html',
  styleUrl: './three-stars.component.scss'
})
export class ThreeStarsComponent {

  constructor(
    private router: Router,
    private progressBarService: ProgressBarService,
  ) {}

  close() {
    this.progressBarService.setCurrentPage(1);
    this.router.navigate(['authenticated/map']);
  }
}
