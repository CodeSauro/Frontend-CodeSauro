import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderPhasesComponent } from '../../../../shared/header-phases/header-phases.component';
import { MockPhasesDataTypeService } from '../../../../service/mock-phases-data-type.service';
import { ProgressBarService } from '../../../../service/progress-bar.service';

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
  phaseId!: number;
  ra!: number;
  currentPage: number = 0;
  isTyping: boolean = true;
  numberOfPagesTotal: number = 0;
  numberOfPagesExplaining: number = 0;

  constructor(
    private mockPhasesDataTypeService: MockPhasesDataTypeService,
    private route: ActivatedRoute,
    private progressBarService: ProgressBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.phaseId = Number(this.route.snapshot.paramMap.get('id'));
    this.mock = this.mockPhasesDataTypeService.getMockData();
    this.progressBarService.loadPageData(this.phaseId);
    this.numberOfPagesTotal = this.progressBarService.getNumberOfPagesTotal();
    this.currentPage = this.progressBarService.getCurrentPage();
    this.loadPageData();
  }

  ngAfterViewInit() {
    this.updateText();
  }

  private loadPageData() {
    const item = this.mock.find(data => data.id === this.phaseId);
    this.numberOfPagesExplaining = item?.number_of_pages_explaining || 0;
    this.ra = item?.ra || 0;
  }

  private updateText() {
    const item = this.mock.find(data => data.id === this.phaseId);
    let text = '';

    if (item) {
      if (this.currentPage === 1) {
        text = item.explaining_phase_page_1;
      } else if (this.currentPage === 2) {
        text = item.explaining_phase_page_2;
      } else if (this.currentPage === 3) {
        text = item.explaining_phase_page_3;
      } else if (this.currentPage === 4) {
        text = item.explaining_phase_page_4;
      } else if (this.currentPage === 5) {
        text = item.explaining_phase_page_5
      } else if (this.currentPage === 6) {
        text = item.explaining_phase_page_6
      } else if (this.currentPage === 7) {
        text = item.explaining_phase_page_7
      } else if (this.currentPage === 8) {
        text = item.explaining_phase_page_8
      } else if (this.currentPage === 9) {
        text = item.explaining_phase_page_9
      } else if (this.currentPage === 10) {
        text = item.explaining_phase_page_10
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
            setTimeout(typeLine, 0);
          } else {
            typingAnimationElement.innerHTML += '<br/>';
            index = 0;
            lineIndex++;
            setTimeout(typeLine, 0);
          }
        } else {
          this.isTyping = false;
        }
      };

      typeLine();
    }
  }

  public continue() {
    this.progressBarService.updateProgress((this.currentPage / this.numberOfPagesTotal) * 100);

    setTimeout(() => {
      if (this.isTyping) return;
      this.currentPage++;
      if (this.currentPage <= this.numberOfPagesExplaining) {
        this.updateText();
      } else {
        this.progressBarService.setCurrentPage(this.currentPage);

        switch(this.ra) {
          case 1:
            this.router.navigate(['/authenticated/phases/data-type', this.phaseId]);
            break;
          case 2:
            this.router.navigate(['/authenticated/phases/operator', this.phaseId]);
            break;
          case 3:
            this.router.navigate(['/authenticated/phases/conditional-structures', this.phaseId]);
            break;
        }
      }
    }, 300);
  }
}
