import { Component } from '@angular/core';
import { HeaderMapComponent } from '../../../shared/header-map/header-map.component';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-after-auth',
  standalone: true,
  imports: [
    HeaderMapComponent
  ],
  templateUrl: './settings-after-auth.component.html',
  styleUrl: './settings-after-auth.component.scss'
})
export class SettingsAfterAuthComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
