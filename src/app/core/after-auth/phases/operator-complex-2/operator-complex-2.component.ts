import { Component, OnInit } from '@angular/core';
import { HeaderPhasesComponent } from '../../../../shared/header-phases/header-phases.component';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockPhasesDataTypeService } from '../../../../service/mock-phases-data-type.service';
import { ProgressBarService } from '../../../../service/progress-bar.service';
import { ProgressStarService } from '../../../../service/progress-star.service';
import { AuthService } from '../../../../service/auth.service';
import { StartPhaseService } from '../../../../service/start-phase.service';

@Component({
  selector: 'app-operator-complex-2',
  standalone: true,
  imports: [
    HeaderPhasesComponent,
    DragDropModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './operator-complex-2.component.html',
  styleUrl: './operator-complex-2.component.scss'
})
export class OperatorComplex2Component implements OnInit {

  mock!: any[];
  phaseId!: number;
  variables: any[] = [];
  answers: any[] = [];
  variablesNumbers: any[] = [];
  correct_answers: any[] = [];
  isContinueDisabled: boolean = true;
  isValidationMode: boolean = false;
  isCorrect: boolean = false;
  validationMessage: string = '';
  isDragDisabled: boolean = false;
  numberOfPagesTotal: number = 0;
  numberOfPagesPhases: number = 0;
  numberOfPagesExplaining: number = 0;
  currentPage: number = 0;
  currentPagePhase: number = 0;
  correctAnswerCount: number = 0;
  contextPhase: string = "";
  vidasZeradas: boolean = false;

  randomizedPages: any[] = [];

  constructor(
    private mockPhasesDataTypeService: MockPhasesDataTypeService,
    private route: ActivatedRoute,
    private progressBarService: ProgressBarService,
    private progressStarService: ProgressStarService,
    private router: Router,
    private authService: AuthService,
    private startPhaseService: StartPhaseService
  ) {}

  ngOnInit(): void {
    this.phaseId = Number(this.route.snapshot.paramMap.get('id'));
    this.mock = this.mockPhasesDataTypeService.getMockData();
    this.progressBarService.loadPageData(this.phaseId);
    this.numberOfPagesTotal = this.progressBarService.getNumberOfPagesTotal();
    this.currentPage = this.progressBarService.getCurrentPage();
    this.loadPageData(this.phaseId);
  }

  private checkContinueButtonState() {
    this.isContinueDisabled = this.answers.length === 0;
  }

  private loadPageData(phaseId: number) {
    const item = this.mock.find(data => data.id === phaseId);
    this.numberOfPagesPhases = item?.number_of_pages_phases || 0;
    this.numberOfPagesExplaining = item?.number_of_pages_explaining || 0;
    this.currentPagePhase = this.currentPage - this.numberOfPagesExplaining;
    this.contextPhase = item?.context_phase;

    const pages = [
      {
        variables: item.variables_page_1,
        variables_numbers: item.variables_numbers_page_1,
        correct_answers: item.correct_answers_page_1
      },
      {
        variables: item.variables_page_2,
        variables_numbers: item.variables_numbers_page_2,
        correct_answers: item.correct_answers_page_2
      },
      {
        variables: item.variables_page_3,
        variables_numbers: item.variables_numbers_page_3,
        correct_answers: item.correct_answers_page_3
      },
      {
        variables: item.variables_page_4,
        variables_numbers: item.variables_numbers_page_4,
        correct_answers: item.correct_answers_page_4
      },
      {
        variables: item.variables_page_5,
        variables_numbers: item.variables_numbers_page_5,
        correct_answers: item.correct_answers_page_5
      },
      {
        variables: item.variables_page_6,
        variables_numbers: item.variables_numbers_page_6,
        correct_answers: item.correct_answers_page_6
      },
    ].filter(page =>
      page.variables && page.variables.length > 0 &&
      page.correct_answers && page.correct_answers.length > 0
    );

    this.randomizedPages = this.shuffleArray(pages);

    if (this.randomizedPages.length > 0 && this.currentPagePhase > 0 && this.currentPagePhase <= this.randomizedPages.length) {
      const currentPageData = this.randomizedPages[this.currentPagePhase - 1];
      this.variables = this.shuffleArray([...currentPageData.variables]);
      this.variablesNumbers = currentPageData.variables_numbers || [];

      this.correct_answers = [...currentPageData.correct_answers];
    } else {
      this.variables = [];
      this.variablesNumbers = [];
      this.correct_answers = [];
    }

    this.answers = [];
    this.checkContinueButtonState();
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  continue() {
    this.progressBarService.updateProgress((this.currentPage / this.numberOfPagesTotal) * 100);
    if (this.isValidationMode) {
      if (this.vidasZeradas) {
        this.router.navigate(['/authenticated/punctuation/without-life']);
      } else {
        this.currentPage++;
        this.currentPagePhase++;
        if (this.currentPage <= (this.numberOfPagesExplaining + this.numberOfPagesPhases)) {
          this.loadPageData(this.phaseId);
        } else {
          this.progressStarService.updateFases(this.numberOfPagesPhases);
          this.progressStarService.updateAcertos(this.correctAnswerCount);

          this.progressBarService.setCurrentPage(this.currentPage);
          this.router.navigate(['/authenticated/phases/knowledge-validation-rectangular-box', this.phaseId]);
        }
      }
      this.isValidationMode = false;
      this.validationMessage = '';
      this.isDragDisabled = false;
    } else {
      this.compareAnswers();
      this.isValidationMode = true;
      this.isDragDisabled = true;
    }
  }

  private compareAnswers() {
    const sortedAnswers = [...this.answers].sort();
    const sortedCorrectAnswers = [...this.correct_answers].sort();

    if (JSON.stringify(sortedAnswers) === JSON.stringify(sortedCorrectAnswers)) {
      this.validationMessage = 'Excelente!';
      this.isCorrect = true;
      this.correctAnswerCount++;
    } else {
      this.validationMessage = 'Incorreto! Resposta correta: ' + this.correct_answers.join(', ');
      this.isCorrect = false;

      const userId = this.authService.getUserIdFromToken();
      if (userId) {
        this.startPhaseService.atualizarVida(userId, false).subscribe(() => {
          this.startPhaseService.getVidas().subscribe(vidas => {
            if (vidas === 0) {
              this.vidasZeradas = true;
            }
          });
        });
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.isDragDisabled) return;

    if (event.previousContainer !== event.container) {
      if (event.container.data.length > 0) {
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          0,
          event.previousContainer.data.length
        );
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.checkContinueButtonState();
    }
  }
}

