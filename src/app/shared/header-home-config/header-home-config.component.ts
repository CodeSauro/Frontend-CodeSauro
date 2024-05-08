import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-home-config',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header-home-config.component.html',
  styleUrl: './header-home-config.component.scss'
})
export class HeaderHomeConfigComponent {

}
