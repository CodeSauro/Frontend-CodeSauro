import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-phases',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header-phases.component.html',
  styleUrl: './header-phases.component.scss'
})
export class HeaderPhasesComponent implements OnInit {

  public progress: number = 0;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.updateProgress(7)
  }

  public leave() {
    this.router.navigate(['/authenticated/map']);
  }

  public updateProgress(value: number) {
    if (value >= 0 && value <= 8) {
      this.progress = (value / 8) * 100;
    }
  }
}
