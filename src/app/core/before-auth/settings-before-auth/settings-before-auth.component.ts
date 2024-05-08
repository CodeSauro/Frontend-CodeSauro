import { Component } from '@angular/core';
import { HeaderHomeComponent } from '../../../shared/header-home/header-home.component';

@Component({
  selector: 'app-settings-before-auth',
  standalone: true,
  imports: [
    HeaderHomeComponent
  ],
  templateUrl: './settings-before-auth.component.html',
  styleUrl: './settings-before-auth.component.scss'
})
export class SettingsBeforeAuthComponent {

}
