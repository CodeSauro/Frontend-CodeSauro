import { Component } from '@angular/core';
import { HeaderConfigComponent } from '../../../shared/header-config/header-config.component';
import { RouterLink } from '@angular/router';

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

}
