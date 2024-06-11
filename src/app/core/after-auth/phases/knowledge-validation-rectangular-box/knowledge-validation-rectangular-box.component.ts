import { Component, OnInit } from '@angular/core';
import { HeaderPhasesComponent } from '../../../../shared/header-phases/header-phases.component';
import { MockPhasesDataTypeService } from '../../../../service/mock-phases-data-type.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProgressBarService } from '../../../../service/progress-bar.service';

@Component({
  selector: 'app-knowledge-validation-rectangular-box',
  standalone: true,
  imports: [
    HeaderPhasesComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './knowledge-validation-rectangular-box.component.html',
  styleUrls: ['./knowledge-validation-rectangular-box.component.scss']
})
export class KnowledgeValidationRectangularBoxComponent implements OnInit {

  knowledgeValidationQuestion: string = '';
  knowledgeValidationAnswers: string[] = [];
  knowledgeValidationCorrectAnswer: string = '';
  isValidationMode: boolean = false;
  isCorrect: boolean = false;
  validationMessage: string = '';

  constructor(
    private mockPhasesDataTypeService: MockPhasesDataTypeService,
    private progressBarService: ProgressBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const mockData = this.mockPhasesDataTypeService.getMockData();
    const mock = mockData.find(m => m.id === 1);
    if (mock) {
      this.knowledgeValidationQuestion = mock.knowledge_validation_question;
      this.knowledgeValidationAnswers = mock.knowledge_validation_answers;
      this.knowledgeValidationCorrectAnswer = mock.knowledge_validation_correct_answer;
    }
  }

  checkAnswer(answer: string): void {
    if (!this.isValidationMode) {
      this.isValidationMode = true;
      this.progressBarService.updateProgress(100);
      if (answer === this.knowledgeValidationCorrectAnswer) {
        this.validationMessage = 'Excelente!';
        this.isCorrect = true;
      } else {
        this.validationMessage = this.knowledgeValidationCorrectAnswer;
        this.isCorrect = false;
      }
    }
  }

  continue(): void {
    if (this.isValidationMode) {
      this.router.navigate(['authenticated/punctuation/three-stars']);
    }
  }
}
