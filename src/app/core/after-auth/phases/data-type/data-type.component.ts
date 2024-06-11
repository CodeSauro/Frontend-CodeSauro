import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { HeaderPhasesComponent } from '../../../../shared/header-phases/header-phases.component';
import { Router, RouterModule } from '@angular/router';
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
  variables: any[] = [];
  answers: any[] = [];
  correct_answers: any[] = [];
  currentPage: number = 1;
  isContinueDisabled: boolean = true;
  isValidationMode: boolean = false;
  isCorrect: boolean = false;
  validationMessage: string = '';
  isDragDisabled: boolean = false;
  numberOfPagesDataType: number = 0;
  numberOfPagesTotal: number = 0;

  constructor(
    private mockPhasesDataTypeService: MockPhasesDataTypeService,
    private progressService: ProgressBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mock = this.mockPhasesDataTypeService.getMockData();
    this.loadPageData();
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

  continue() {
    this.progressService.updateProgress((this.currentPage / this.numberOfPagesTotal) * 100);
    if (this.isValidationMode) {
      this.currentPage++;
      if (this.currentPage > this.numberOfPagesDataType) {
        this.router.navigate(['/authenticated/phases/knowledge-validation-rectangular-box']);
      } else {
        this.loadPageData();
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

  private loadPageData() {
    const item = this.mock.find(data => data.id === 1);
    this.numberOfPagesDataType = item.number_of_pages
    this.numberOfPagesTotal = this.numberOfPagesDataType + 1;

    if (item) {
      switch (this.currentPage) {
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
      }
      this.answers = [];
      this.checkContinueButtonState();
    }
  }

  private checkContinueButtonState() {
    this.isContinueDisabled = this.answers.length === 0;
  }

  private compareAnswers() {
    const sortedAnswers = [...this.answers].sort();
    const sortedCorrectAnswers = [...this.correct_answers].sort();

    if (JSON.stringify(sortedAnswers) === JSON.stringify(sortedCorrectAnswers)) {
      this.validationMessage = 'Excelente!';
      this.isCorrect = true;
    } else {
      this.validationMessage = 'Incorreto! Resposta correta: ' + this.correct_answers.join(', ');
      this.isCorrect = false;
    }
  }
}
