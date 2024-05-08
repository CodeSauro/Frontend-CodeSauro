import { Component } from '@angular/core';
import { HeaderPhasesComponent } from '../../../../shared/header-phases/header-phases.component';

@Component({
  selector: 'app-data-type',
  standalone: true,
  imports: [
    HeaderPhasesComponent,
  ],
  templateUrl: './data-type.component.html',
  styleUrl: './data-type.component.scss'
})
export class DataTypeComponent {

}
