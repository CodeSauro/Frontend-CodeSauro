import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProgressBarService } from '../../../../service/progress-bar.service';

@Component({
  selector: 'app-without-life',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './without-life.component.html',
  styleUrl: './without-life.component.scss'
})
export class WithoutLifeComponent {

  constructor(
    private router: Router,
    private progressBarService: ProgressBarService,
  ) {}

  close() {
    this.progressBarService.setCurrentPage(1);
    this.router.navigate(['authenticated/map']);
  }
}
