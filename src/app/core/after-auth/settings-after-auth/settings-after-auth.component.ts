import { Component } from '@angular/core';
import { HeaderHomeMapComponent } from '../../../shared/header-home-map/header-home-map.component';

@Component({
  selector: 'app-settings-after-auth',
  standalone: true,
  imports: [
    HeaderHomeMapComponent
  ],
  templateUrl: './settings-after-auth.component.html',
  styleUrl: './settings-after-auth.component.scss'
})
export class SettingsAfterAuthComponent {

}
