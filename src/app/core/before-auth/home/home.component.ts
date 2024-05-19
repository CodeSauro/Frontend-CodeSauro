import { Component } from '@angular/core';
import { HeaderConfigComponent } from '../../../shared/header-config/header-config.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
      HeaderConfigComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) {}

  // public loadingRouter(): Promise<void> {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       this.router.navigate(['/auth'])
  //       resolve();
  //     }, 400);
  //   });
  // }

  public loadingRouter() {
    this.router.navigate(['/auth'])
  }

}
