import { Component, OnInit } from '@angular/core';
import { HeaderPhasesComponent } from '../../../../shared/header-phases/header-phases.component';
import { MockPhasesDataTypeService } from '../../../../service/mock-phases-data-type.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProgressBarService } from '../../../../service/progress-bar.service';
import { StartPhaseService } from '../../../../service/start-phase.service';
import { AuthService } from '../../../../service/auth.service';
import { ProgressStarService } from '../../../../service/progress-star.service';

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
  correctAnswerCount: number = 0;
  vidas: number = 5;  // Inicializa com um valor temporário até carregar do backend
  vidasZeradas: boolean = false;

  constructor(
    private mockPhasesDataTypeService: MockPhasesDataTypeService,
    private route: ActivatedRoute,
    private progressBarService: ProgressBarService,
    private startPhaseService: StartPhaseService,
    private progressStarService: ProgressStarService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.phaseId = Number(this.route.snapshot.paramMap.get('id'));
    this.progressBarService.loadPageData(this.phaseId);
    this.numberOfPagesTotal = this.progressBarService.getNumberOfPagesTotal();
    this.numberOfPagesQuestions = 1;
    this.currentPage = this.progressBarService.getCurrentPage();

    // Carregar vidas do backend
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.startPhaseService.carregarVidasDoBackend(userId);
      this.startPhaseService.getVidas().subscribe(vidas => {
        this.vidas = vidas;
        this.vidasZeradas = vidas === 0;
      });
    }

    this.loadPageData(this.phaseId);
  }

  private loadPageData(phaseId: number): void {
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
        this.isCorrect = true;
        this.correctAnswerCount++;
        this.validationMessage = 'Correto!';
      } else {
        this.validationMessage = `${this.knowledgeValidationCorrectAnswer}`;
        this.isCorrect = false;

        const userId = this.authService.getUserIdFromToken();
        if (userId) {
          this.startPhaseService.atualizarVida(userId, false).subscribe(() => {
            this.startPhaseService.getVidas().subscribe(vidas => {
              this.vidas = vidas;
              this.vidasZeradas = vidas === 0;
            });
          });
        }
      }
    }
  }

  continue(): void {
    if (this.isValidationMode) {
      this.progressBarService.setCurrentPage(this.currentPage);

      const userId = this.authService.getUserIdFromToken();

      // Atualizar progresso de fases e acertos
      this.progressStarService.updateFases(this.numberOfPagesQuestions);
      this.progressStarService.updateAcertos(this.correctAnswerCount);

      // Calcular estrelas com base no desempenho
      const estrelas = this.progressStarService.calculateStars();

      if (userId) {
        this.startPhaseService.putUserProgress(userId, this.phaseId, estrelas).subscribe(
          response => {
            // Navegar para a página de pontuação com base no número de estrelas
            switch (estrelas) {
              case 0:
                this.router.navigate(['/authenticated/punctuation/zero-star']);
                break;
              case 1:
                this.router.navigate(['/authenticated/punctuation/one-star']);
                break;
              case 2:
                this.router.navigate(['/authenticated/punctuation/two-stars']);
                break;
              case 3:
                this.router.navigate(['/authenticated/punctuation/three-stars']);
                break;
            }
          },
          error => {
            console.error('Erro ao atualizar o progresso:', error);
          }
        );
      }

      // Resetar progresso das estrelas para a próxima fase
      this.progressStarService.resetProgress();
    }
  }
}
