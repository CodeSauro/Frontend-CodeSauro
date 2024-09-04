import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressBarService } from './progress-bar.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioProgresso } from '../modules/usuario-progresso.module';

@Injectable({
  providedIn: 'root'
})
export class StartPhaseService {

  private url: string = 'http://localhost:8080/';

  constructor(
    private router: Router,
    private progressBarService: ProgressBarService,
    private http: HttpClient
  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      return new HttpHeaders();
    }
  }

  public startPhaseService(phaseId: number) {
    this.progressBarService.resetProgress();
    this.router.navigate(['/authenticated/phases/explaining-phase', phaseId]);
  }

  public getUserProgress(userId: number): Observable<UsuarioProgresso[]> {
    return this.http.get<UsuarioProgresso[]>(`${this.url}usuarios/${userId}/progresso`, { headers: this.getHeaders() });
  }

  public putUserProgress(userId: number, progressoData: UsuarioProgresso): Observable<UsuarioProgresso> {
    return this.http.put<UsuarioProgresso>(`${this.url}usuarios/${userId}/progresso`, progressoData, { headers: this.getHeaders() });
  }
}
