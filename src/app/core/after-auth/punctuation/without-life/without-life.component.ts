import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

  close() {
    this.router.navigate(['authenticated/map']);
  }
}
