import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-password-changed',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './password-changed.component.html',
  styleUrl: './password-changed.component.scss'
})
export class PasswordChangedComponent {

  constructor(
    private router: Router,
  ) {}

  public close(): void {
    this.router.navigate(['/auth']);
  }
}
