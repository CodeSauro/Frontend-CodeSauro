import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div [@routeAnimations]="o.isActivated ? o.activatedRoute : ''">
      <router-outlet #o="outlet"></router-outlet>
    </div>
  `,
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        animate('0.2s', style({}))
      ])
    ])
  ]
})
export class AppComponent {}
