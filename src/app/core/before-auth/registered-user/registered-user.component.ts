import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registered-user',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './registered-user.component.html',
  styleUrl: './registered-user.component.scss'
})
export class RegisteredUserComponent {

  constructor(
    private router: Router,
  ) {}

  public close(): void {
    this.router.navigate(['/auth']);
  }
}

