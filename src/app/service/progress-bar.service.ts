import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MockPhasesDataTypeService } from './mock-phases-data-type.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  mock!: any[];
  currentPage: number = 1;
  numberOfPagesExplaining: number = 0;
  numberOfPagesPhases: number = 0;
  numberOfPagesQuestions: number = 0;
  numberOfPagesTotal: number = 0;

  private progressSource = new BehaviorSubject<number>(0);
  currentProgress = this.progressSource.asObservable();

  constructor(
    private mockPhasesDataTypeService: MockPhasesDataTypeService,
  ) {
    this.mock = this.mockPhasesDataTypeService.getMockData();
    this.loadPageData();
  }

  updateProgress(progress: number) {
    this.progressSource.next(progress);
  }

  resetProgress() {
    this.progressSource.next(0);
  }

  private loadPageData() {
    const item = this.mock.find(data => data.id === 1);
    this.numberOfPagesPhases = item.number_of_pages_phases;
    this.numberOfPagesExplaining = item.number_of_pages_explaining;
    this.numberOfPagesQuestions = item.number_of_pages_questions
    this.numberOfPagesTotal = this.numberOfPagesPhases + this.numberOfPagesExplaining + this.numberOfPagesQuestions;
  }

  getNumberOfPagesTotal(): number {
    return this.numberOfPagesTotal;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setCurrentPage(value: number) {
    this.currentPage = value;
  }
}
