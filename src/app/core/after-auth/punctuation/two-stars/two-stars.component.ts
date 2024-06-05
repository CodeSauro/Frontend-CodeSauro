import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

  close() {
    this.router.navigate(['authenticated/map']);
  }
}
