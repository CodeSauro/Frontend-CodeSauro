import { Component, OnInit } from '@angular/core';
import { HeaderConfigComponent } from '../../../shared/header-config/header-config.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderConfigComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    console.log("Token ativo: " + this.authService.isLoggedIn())
  }

  constructor(private router: Router, private authService: AuthService) {}

  public loadingRouter() {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.authService.validateToken(token).subscribe(isValid => {
        if (isValid) {
          this.router.navigate(['/authenticated/phases/data-type']);
        } else {
          this.router.navigate(['/auth']);
        }
      });
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
