import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-config',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header-config.component.html',
  styleUrl: './header-config.component.scss'
})
export class HeaderConfigComponent {

}
