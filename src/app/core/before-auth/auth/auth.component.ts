import { Component } from '@angular/core';
import { HeaderHomeConfigComponent } from '../../../shared/header-home-config/header-home-config.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    HeaderHomeConfigComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
