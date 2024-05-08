import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.scss'
})
export class HeaderHomeComponent {

}
