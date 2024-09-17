import { Component } from '@angular/core';
import { HeaderAuthHomeComponent } from '../../../shared/header-auth-home/header-auth-home.component';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    HeaderAuthHomeComponent
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {

}
