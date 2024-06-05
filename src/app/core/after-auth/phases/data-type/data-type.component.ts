import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { HeaderPhasesComponent } from '../../../../shared/header-phases/header-phases.component';
import { Router, RouterModule } from '@angular/router';
import { MockPhasesDataTypeService } from '../../../../service/mock-phases-data-type.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-type',
  standalone: true,
  imports: [
    HeaderPhasesComponent,
    DragDropModule,
    RouterModule,
    CommonModule
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

  constructor(
    private mockPhasesDataTypeService: MockPhasesDataTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mock = this.mockPhasesDataTypeService.getMockData();
    this.loadPageData();
  }

  drop(event: CdkDragDrop<string[]>) {
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
    this.compareAnswers();
    this.currentPage++;
    if (this.currentPage > 4) {
      this.router.navigate(['/authenticated/phases/knowledge-validation-rectangular-box']);
    } else {
      this.loadPageData();
    }
  }

  private loadPageData() {
    const item = this.mock.find(data => data.id === 1);
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
    console.log(this.answers)
    console.log(this.correct_answers)

    const sortedAnswers = [...this.answers].sort();
    const sortedCorrectAnswers = [...this.correct_answers].sort();

    if (JSON.stringify(sortedAnswers) === JSON.stringify(sortedCorrectAnswers)) {
      console.log('dados iguais');
    } else {
      console.log('dados diferentes');
    }
  }
}
