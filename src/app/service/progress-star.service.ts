import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressStarService {

  totalFases: number = 0;
  totalAcertos: number = 0;

  resetProgress() {
    this.totalFases = 0;
    this.totalAcertos = 0;
  }

  updateFases(fases: number) {
    this.totalFases += fases;
  }

  updateAcertos(acertos: number) {
    this.totalAcertos += acertos;
  }

  calculateStars(): number {
    if (this.totalFases === 0) {
      return 0;
    }

    const percentage = (this.totalAcertos / this.totalFases) * 100;

    if (percentage === 100) {
      return 3;
    } else if (percentage >= 75) {
      return 2;
    } else if (percentage >= 50) {
      return 1;
    } else {
      return 0;
    }
  }
}
