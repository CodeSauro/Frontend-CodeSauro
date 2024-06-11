import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-auth-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header-auth-home.component.html',
  styleUrl: './header-auth-home.component.scss'
})
export class HeaderAuthHomeComponent {

}
