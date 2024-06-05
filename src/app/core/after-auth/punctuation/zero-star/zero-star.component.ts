import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

  close() {
    this.router.navigate(['authenticated/map']);
  }
}
