import { Component } from '@angular/core';
import { HeaderMapComponent } from '../../../shared/header-map/header-map.component';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings-after-auth',
  standalone: true,
  imports: [
    HeaderMapComponent,
    RouterLink
  ],
  templateUrl: './settings-after-auth.component.html',
  styleUrl: './settings-after-auth.component.scss'
})
export class SettingsAfterAuthComponent {

}
