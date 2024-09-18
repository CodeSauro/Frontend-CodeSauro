import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div [@routeAnimations]="o.isActivated ? o.activatedRoute : ''" class="route-container">
      <router-outlet #o="outlet"></router-outlet>
    </div>
  `,
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }), { optional: true }),
        group([
          query(':leave', [
            animate('0.1s ease-in', style({ opacity: 1 }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0 }),
            animate('0.1s ease-out', style({ opacity: 1 }))
          ], { optional: true })
        ])
      ])
    ])
  ],
  styles: [`
    .route-container {
      position: relative;
      width: 100%;
      min-height: 100vh;
    }
  `]
})
export class AppComponent {}
