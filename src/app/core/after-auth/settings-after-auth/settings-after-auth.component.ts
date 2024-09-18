import { Component } from '@angular/core';
import { HeaderMapComponent } from '../../../shared/header-map/header-map.component';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-after-auth',
  standalone: true,
  imports: [
    HeaderMapComponent,
    RouterLink,
    CommonModule
  ],
  templateUrl: './settings-after-auth.component.html',
  styleUrls: ['./settings-after-auth.component.scss']
})
export class SettingsAfterAuthComponent {

  showLeaveContainer: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public showLeave(): void {
    this.showLeaveContainer = true;
  }

  public continueActivity(): void {
    this.showLeaveContainer = false;
  }

  public exit(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
