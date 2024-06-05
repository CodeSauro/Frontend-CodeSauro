import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderPhasesComponent } from '../../../../shared/header-phases/header-phases.component';
import { MockPhasesDataTypeService } from '../../../../service/mock-phases-data-type.service';

@Component({
  selector: 'app-explaining-phase',
  standalone: true,
  imports: [
    HeaderPhasesComponent,
    RouterModule
  ],
  templateUrl: './explaining-phase.component.html',
  styleUrls: ['./explaining-phase.component.scss']
})
export class ExplainingPhaseComponent implements OnInit, AfterViewInit {

  mock!: any[];
  currentPage: number = 1;
  isTyping: boolean = true;

  constructor(
    private mockPhasesDataTypeService: MockPhasesDataTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mock = this.mockPhasesDataTypeService.getMockData();
  }

  public continue() {
    if (this.isTyping) return;

    this.currentPage++;
    if (this.currentPage > 2) {
      this.router.navigate(['/authenticated/phases/data-type']);
    } else {
      this.updateText();
    }
  }

  ngAfterViewInit() {
    this.updateText();
  }

  private updateText() {
    const item = this.mock.find(data => data.id === 1);
    let text = '';

    if (item) {
      if (this.currentPage === 1) {
        text = item.explaining_phase_page_1;
      } else if (this.currentPage === 2) {
        text = item.explaining_phase_page_2;
      }
    }

    const typingAnimationElement = document.getElementById('typing-animation');

    if (typingAnimationElement) {
      typingAnimationElement.innerHTML = '';
      this.isTyping = true;
      let index = 0;
      let lineIndex = 0;
      const lines = text.split('\n');

      const typeLine = () => {
        if (lineIndex < lines.length) {
          if (index < lines[lineIndex].length) {
            typingAnimationElement.innerHTML += lines[lineIndex].charAt(index);
            index++;
            setTimeout(typeLine, 65);
          } else {
            typingAnimationElement.innerHTML += '<br/>';
            index = 0;
            lineIndex++;
            setTimeout(typeLine, 65);
          }
        } else {
          this.isTyping = false;
        }
      };

      typeLine();
    }
  }
}
