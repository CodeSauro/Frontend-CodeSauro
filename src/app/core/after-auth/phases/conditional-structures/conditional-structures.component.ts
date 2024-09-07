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

    switch (this.currentPagePhase) {
      case 1:
        this.variablesArray = item.variables_page_1.map((variable: any) => [variable]);
        this.correct_answers = [...item.correct_answers_page_1];
        this.mazeConfiguration = [...item.maze_configuration_1];
        break;
      case 2:
        this.variablesArray = item.variables_page_2.map((variable: any) => [variable]);
        this.correct_answers = [...item.correct_answers_page_2];
        this.mazeConfiguration = [...item.maze_configuration_2];
        break;
      case 3:
        this.variablesArray = item.variables_page_3.map((variable: any) => [variable]);
        this.correct_answers = [...item.correct_answers_page_3];
        this.mazeConfiguration = [...item.maze_configuration_3];
        break;
      case 4:
        this.variablesArray = item.variables_page_4.map((variable: any) => [variable]);
        this.correct_answers = [...item.correct_answers_page_4];
        this.mazeConfiguration = [...item.maze_configuration_4];
        break;
      case 5:
        this.variablesArray = item.variables_page_5.map((variable: any) => [variable]);
        this.correct_answers = [...item.correct_answers_page_5];
        this.mazeConfiguration = [...item.maze_configuration_5];
        break;
      case 6:
        this.variablesArray = item.variables_page_6.map((variable: any) => [variable]);
        this.correct_answers = [...item.correct_answers_page_6];
        this.mazeConfiguration = [...item.maze_configuration_6];
        break;
    }

    this.dropListIds = this.variablesArray.map((_, index) => `dropList${index}`);
    this.checkContinueButtonState();
  }

  private checkContinueButtonState() {
    this.isContinueDisabled = this.variablesArray.some(variable => variable.length === 0);
  }

  continue() {
    this.progressBarService.updateProgress((this.currentPage / this.numberOfPagesTotal) * 100);
    if (this.isValidationMode) {
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
        this.startPhaseService.atualizarVida(userId, false).subscribe();
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
