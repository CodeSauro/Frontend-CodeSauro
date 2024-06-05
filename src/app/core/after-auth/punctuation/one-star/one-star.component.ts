import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

  close() {
    this.router.navigate(['authenticated/map']);
  }
}
