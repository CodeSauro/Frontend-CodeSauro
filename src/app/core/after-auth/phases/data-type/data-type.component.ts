import { ProgressStarService } from './../../../../service/progress-star.service';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { HeaderPhasesComponent } from '../../../../shared/header-phases/header-phases.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MockPhasesDataTypeService } from '../../../../service/mock-phases-data-type.service';
import { CommonModule } from '@angular/common';
import { ProgressBarService } from '../../../../service/progress-bar.service';

@Component({
  selector: 'app-data-type',
  standalone: true,
  imports: [
    HeaderPhasesComponent,
    DragDropModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './data-type.component.html',
  styleUrls: ['./data-type.component.scss']
})
export class DataTypeComponent implements OnInit {

  mock!: any[];
  phaseId!: number;
  variables: any[] = [];
  answers: any[] = [];
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
  dataType: string = '';
  correctAnswerCount: number = 0;

  constructor(
    private mockPhasesDataTypeService: MockPhasesDataTypeService,
    private route: ActivatedRoute,
    private progressBarService: ProgressBarService,
    private progressStarService: ProgressStarService,
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

  private checkContinueButtonState() {
    this.isContinueDisabled = this.answers.length === 0;
  }

  private loadPageData(phaseId: number) {
    const item = this.mock.find(data => data.id === phaseId);
    this.numberOfPagesPhases = item?.number_of_pages_phases || 0;
    this.numberOfPagesExplaining = item?.number_of_pages_explaining || 0;
    this.currentPagePhase = this.currentPage - this.numberOfPagesExplaining;
    this.dataType = item?.data_type || "";

    switch (this.currentPagePhase) {
      case 1:
        this.variables = [...item.variables_page_1];
        this.correct_answers = [...item.correct_answers_page_1];
        break;
      case 2:
        this.variables = [...item.variables_page_2];
        this.correct_answers = [...item.correct_answers_page_2];
        break;
      case 3:
        this.variables = [...item.variables_page_3];
        this.correct_answers = [...item.correct_answers_page_3];
        break;
      case 4:
        this.variables = [...item.variables_page_4];
        this.correct_answers = [...item.correct_answers_page_4];
        break;
      case 5:
        this.variables = [...item.variables_page_5];
        this.correct_answers = [...item.correct_answers_page_5];
        break;
      case 6:
        this.variables = [...item.variables_page_6];
        this.correct_answers = [...item.correct_answers_page_6];
        break;
    }

    this.answers = [];
    this.checkContinueButtonState();
  }

  continue() {
    this.progressBarService.updateProgress((this.currentPage / this.numberOfPagesTotal) * 100);
    if (this.isValidationMode) {
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
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.isDragDisabled) return;
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.checkContinueButtonState();
    }
  }
}
