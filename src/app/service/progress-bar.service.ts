import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private progressSource = new BehaviorSubject<number>(0);
  currentProgress = this.progressSource.asObservable();

  constructor() { }

  updateProgress(progress: number) {
    this.progressSource.next(progress);
  }

  resetProgress() {
    this.progressSource.next(0); 
  }
}
