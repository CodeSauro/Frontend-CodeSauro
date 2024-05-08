import { Component } from '@angular/core';
import { HeaderHomeConfigComponent } from '../../../shared/header-home-config/header-home-config.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HeaderHomeConfigComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
