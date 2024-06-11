import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-map',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header-map.component.html',
  styleUrl: './header-map.component.scss'
})
export class HeaderMapComponent {

}
