import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProgressBarService } from '../../../../service/progress-bar.service';

@Component({
  selector: 'app-without-life-locked-map',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './without-life-locked-map.component.html',
  styleUrl: './without-life-locked-map.component.scss'
})
export class WithoutLifeLockedMapComponent {
  constructor(
    private router: Router,
    private progressBarService: ProgressBarService,
  ) {}

  close() {
    this.progressBarService.setCurrentPage(1);
    this.router.navigate(['authenticated/map']);
  }
}
