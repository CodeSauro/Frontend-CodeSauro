import { StartPhaseService } from './../../../../service/start-phase.service';
import { ProgressStarService } from './../../../../service/progress-star.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { HeaderPhasesComponent } from '../../../../shared/header-phases/header-phases.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockPhasesDataTypeService } from '../../../../service/mock-phases-data-type.service';
import { ProgressBarService } from '../../../../service/progress-bar.service';
import { UsuarioService } from '../../../../service/usuario.service';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-conditional-structures',
  standalone: true,
  imports: [
    HeaderPhasesComponent,
    DragDropModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './conditional-structures.component.html',
  styleUrls: ['./conditional-structures.component.scss']
})
export class ConditionalStructuresComponent implements OnInit {

  mock!: any[];
  phaseId!: number;
  variablesArray: any[][] = [];
  correct_answers: any[] = [];
  isContinueDisabled: boolean = true;
  isValidationMode: boolean = false;
  isCorrect: boolean = false;
  validationMessage: string = '';
  isDragDisabled: boolean = false;
  numberOfPagesTotal: number = 0;
  currentPage: number = 0;
  numberOfPagesPhases: number = 0;
  numberOfPagesExplaining: number = 0;
  currentPagePhase: number = 0;
  correctAnswerCount: number = 0;
  dropListIds: string[] = [];
  mazeConfiguration: { class: string; content?: string; }[] = [];
  vidasZeradas: boolean = false;

  randomizedPages: any[] = [];

  constructor(
    private mockPhasesDataTypeService: MockPhasesDataTypeService,
    private route: ActivatedRoute,
    private progressBarService: ProgressBarService,
    private progressStarService: ProgressStarService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private startPhaseService: StartPhaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.phaseId = Number(this.route.snapshot.paramMap.get('id'));
    this.mock = this.mockPhasesDataTypeService.getMockData();
    this.progressBarService.loadPageData(this.phaseId);
    this.numberOfPagesTotal = this.progressBarService.getNumberOfPagesTotal();
    this.currentPage = this.progressBarService.getCurrentPage();
    this.loadPageData(this.phaseId);
  }

  private loadPageData(phaseId: number) {
    const item = this.mock.find(data => data.id === phaseId);
    this.numberOfPagesPhases = item?.number_of_pages_phases || 0;
    this.numberOfPagesExplaining = item?.number_of_pages_explaining || 0;
    this.currentPagePhase = this.currentPage - this.numberOfPagesExplaining;

    const pages = [
      {
        variables: item.variables_page_1,
        variables_numbers: item.variables_numbers_page_1,
        correct_answers: item.correct_answers_page_1,
        maze_configuration: item.maze_configuration_1
      },
      {
        variables: item.variables_page_2,
        variables_numbers: item.variables_numbers_page_2,
        correct_answers: item.correct_answers_page_2,
        maze_configuration: item.maze_configuration_2
      },
      {
        variables: item.variables_page_3,
        variables_numbers: item.variables_numbers_page_3,
        correct_answers: item.correct_answers_page_3,
        maze_configuration: item.maze_configuration_3
      },
      {
        variables: item.variables_page_4,
        variables_numbers: item.variables_numbers_page_4,
        correct_answers: item.correct_answers_page_4,
        maze_configuration: item.maze_configuration_4
      },
      {
        variables: item.variables_page_5,
        variables_numbers: item.variables_numbers_page_5,
        correct_answers: item.correct_answers_page_5,
        maze_configuration: item.maze_configuration_5
      },
      {
        variables: item.variables_page_6,
        variables_numbers: item.variables_numbers_page_6,
        correct_answers: item.correct_answers_page_6,
        maze_configuration: item.maze_configuration_6
      },
    ].filter(page =>
      page.variables && page.variables.length > 0 &&
      page.correct_answers && page.correct_answers.length > 0
    );

    this.randomizedPages = this.shuffleArray(pages);

    if (this.randomizedPages.length > 0 && this.currentPagePhase > 0 && this.currentPagePhase <= this.randomizedPages.length) {
      const currentPageData = this.randomizedPages[this.currentPagePhase - 1];
      this.variablesArray = this.shuffleArray(currentPageData.variables.map((variable: any) => [variable]));

      if (currentPageData.variables_numbers) {
        this.variablesArray = this.variablesArray.concat(this.shuffleArray(currentPageData.variables_numbers.map((variable: any) => [variable])));
      }

      this.correct_answers = [...currentPageData.correct_answers];
      this.mazeConfiguration = currentPageData.maze_configuration ? [...currentPageData.maze_configuration] : [];
    } else {
      this.variablesArray = [];
      this.correct_answers = [];
      this.mazeConfiguration = [];
    }

    this.dropListIds = this.variablesArray.map((_, index) => `dropList${index}`);
    this.checkContinueButtonState();
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private checkContinueButtonState() {
    this.isContinueDisabled = this.variablesArray.some(variable => variable.length === 0);
  }

  continue() {
    this.progressBarService.updateProgress((this.currentPage / this.numberOfPagesTotal) * 100);
    if (this.isValidationMode) {
      if (this.vidasZeradas) {
        this.router.navigate(['/authenticated/punctuation/without-life']);
      } else {
        this.isValidationMode = false;
        this.currentPage++;
        this.currentPagePhase++;
        if (this.currentPage <= this.numberOfPagesPhases + this.numberOfPagesExplaining) {
          this.loadPageData(this.phaseId);
        } else {
          this.progressStarService.updateFases(this.numberOfPagesPhases);
          this.progressStarService.updateAcertos(this.correctAnswerCount);
          this.progressBarService.setCurrentPage(this.currentPage);
          this.router.navigate(['/authenticated/phases/knowledge-validation-rectangular-box', this.phaseId]);
        }
        this.isDragDisabled = false;
      }
    } else {
      this.compareAnswers();
      this.isValidationMode = true;
      this.isDragDisabled = true;
    }
  }

  private compareAnswers() {
    const currentOrder = this.variablesArray.map(variableList => variableList[0]);
    if (JSON.stringify(currentOrder) === JSON.stringify(this.correct_answers)) {
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

  drop(event: CdkDragDrop<string[]>, currentIndex: number) {
    if (this.isDragDisabled) return;

    const previousContainerIndex = this.dropListIds.indexOf(event.previousContainer.id);
    const currentContainerIndex = this.dropListIds.indexOf(event.container.id);

    if (previousContainerIndex !== -1 && currentContainerIndex !== -1) {
      if (previousContainerIndex === currentContainerIndex && event.previousIndex === event.currentIndex) {
        return;
      }

      const [movedItem] = this.variablesArray[previousContainerIndex].splice(0, 1);
      const [replacedItem] = this.variablesArray[currentContainerIndex].splice(0, 1, movedItem);
      this.variablesArray[previousContainerIndex].splice(0, 1, replacedItem);
    }

    this.checkContinueButtonState();
  }
}
