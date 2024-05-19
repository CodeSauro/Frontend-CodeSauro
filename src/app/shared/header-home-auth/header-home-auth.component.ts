import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-home-auth',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header-home-auth.component.html',
  styleUrl: './header-home-auth.component.scss'
})
export class HeaderHomeAuthComponent {

}
