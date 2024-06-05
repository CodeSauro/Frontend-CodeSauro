import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

  close() {
    this.router.navigate(['authenticated/map']);
  }
}
