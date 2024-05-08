import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-home-map',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header-home-map.component.html',
  styleUrl: './header-home-map.component.scss'
})
export class HeaderHomeMapComponent {

}
