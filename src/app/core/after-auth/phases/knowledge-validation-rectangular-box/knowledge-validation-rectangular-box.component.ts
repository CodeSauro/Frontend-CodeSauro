import { Component, OnInit } from '@angular/core';
import { HeaderPhasesComponent } from '../../../../shared/header-phases/header-phases.component';
import { MockPhasesDataTypeService } from '../../../../service/mock-phases-data-type.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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

  phaseId!: number;
  currentPage: number = 0;
  knowledgeValidationQuestion: string = '';
  knowledgeValidationAnswers: string[] = [];
  knowledgeValidationCorrectAnswer: string = '';
  isValidationMode: boolean = false;
  isCorrect: boolean = false;
  validationMessage: string = '';
  numberOfPagesTotal: number = 0;
  numberOfPagesQuestions: number = 0;

  constructor(
    private mockPhasesDataTypeService: MockPhasesDataTypeService,
    private route: ActivatedRoute,
    private progressBarService: ProgressBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.phaseId = Number(this.route.snapshot.paramMap.get('id'));
    this.progressBarService.loadPageData(this.phaseId);
    this.numberOfPagesTotal = this.progressBarService.getNumberOfPagesTotal();
    this.currentPage = this.progressBarService.getCurrentPage();
    this.loadPageData(this.phaseId);
  }

  private loadPageData(phaseId: number) {
    const item = this.mockPhasesDataTypeService.getMockData().find(data => data.id === phaseId);
    this.knowledgeValidationQuestion = item?.knowledge_validation_question || '';
    this.knowledgeValidationAnswers = item?.knowledge_validation_answers || [];
    this.knowledgeValidationCorrectAnswer = item?.knowledge_validation_correct_answer || '';
  }

  checkAnswer(answer: string): void {
    if (!this.isValidationMode) {
      this.isValidationMode = true;
      this.progressBarService.updateProgress((this.currentPage / this.numberOfPagesTotal) * 100);

      if (answer === this.knowledgeValidationCorrectAnswer) {
        this.validationMessage = 'Excelente!';
        this.isCorrect = true;
      } else {
        this.validationMessage = `Incorreto! Resposta correta: ${this.knowledgeValidationCorrectAnswer}`;
        this.isCorrect = false;
      }
    }
  }

  continue(): void {
    if (this.isValidationMode) {
      this.progressBarService.setCurrentPage(this.currentPage);
      this.router.navigate(['/authenticated/punctuation/three-stars']);
    }
  }
}
