import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressBarService } from './progress-bar.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { UsuarioProgresso } from '../modules/usuario-progresso.module';
import { MockPhasesDataTypeService } from './mock-phases-data-type.service';
import { Usuario } from '../modules/usuario.module';

@Injectable({
  providedIn: 'root'
})
export class StartPhaseService {

  private url: string = 'https://backend-codesauro.azurewebsites.net/';
  private vidasSubject: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  private vidasZeradas: boolean = false;

  constructor(
    private router: Router,
    private progressBarService: ProgressBarService,
    private http: HttpClient,
    private mockPhasesDataTypeService: MockPhasesDataTypeService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      return new HttpHeaders();
    }
  }

  public carregarVidasDoBackend(userId: number): void {
    this.http.get<Usuario>(`${this.url}usuarios/${userId}`, { headers: this.getHeaders() })
      .subscribe((usuario: Usuario) => {
        this.setVidas(usuario.vidas);
      }, error => {
        console.error('Erro ao carregar vidas do backend:', error);
      });
  }

  public carregarEstrelasDoBackend(userId: number): Observable<number> {
    return this.http.get<Usuario>(`${this.url}usuarios/${userId}`, { headers: this.getHeaders() })
      .pipe(
        map((usuario: Usuario) => usuario.estrelas)
      );
  }

  public setVidas(vidas: number): void {
    this.vidasSubject.next(vidas);
    this.setVidasZeradas(vidas === 0);
  }

  public getVidas(): Observable<number> {
    return this.vidasSubject.asObservable();
  }

  public buscarVidasDoBackendSemCache(userId: number): Observable<number> {
    const headers = this.getHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<Usuario>(`${this.url}usuarios/${userId}`, { headers })
      .pipe(
        map((usuario: Usuario) => usuario.vidas)
      );
  }

  public verificarVidasZeradas(): boolean {
    return this.vidasZeradas;
  }

  private setVidasZeradas(zeradas: boolean): void {
    this.vidasZeradas = zeradas;
  }

  public atualizarVida(userId: number, respostaCorreta: boolean): Observable<void> {
    return this.http.put<void>(
      `${this.url}usuarios/${userId}/vidas`,
      null,
      {
        headers: this.getHeaders(),
        params: { respostaCorreta: respostaCorreta.toString() }
      }
    ).pipe(
      tap(() => {
        let vidasAtuais = this.vidasSubject.getValue();
        if (!respostaCorreta) {
          vidasAtuais = Math.max(vidasAtuais - 1, 0);
          this.setVidas(vidasAtuais);
        }
      })
    );
  }

  public startPhaseService(userId: number, phaseId: number): void {
    if (this.verificarVidasZeradas()) {
      this.router.navigate(['/authenticated/punctuation/without-life-locked-map']);
      return;
    }

    this.pausarRegeneracaoVidas(userId).subscribe(() => {
      this.progressBarService.resetProgress();
      const phaseData = this.mockPhasesDataTypeService.getMockData().find(phase => phase.id === phaseId);
      if (phaseData) {
        const numberOfPagesExplaining = phaseData.number_of_pages_explaining || 0;

        if (numberOfPagesExplaining > 0) {
          this.router.navigate(['/authenticated/phases/explaining-phase', phaseId]);
        } else {
          this.navigateToPhaseByRA(phaseData.ra, phaseId);
        }
      }
    });
  }

  private navigateToPhaseByRA(ra: number, phaseId: number): void {
    switch (ra) {
      case 1:
        this.router.navigate(['/authenticated/phases/data-type', phaseId]);
        break;
      case 2:
        this.router.navigate(['/authenticated/phases/operator', phaseId]);
        break;
      case 3:
        this.router.navigate(['/authenticated/phases/conditional-structures', phaseId]);
        break;
      case 22:
        this.router.navigate(['/authenticated/phases/operator-complex', phaseId]);
        break;
      case 33:
      this.router.navigate(['/authenticated/phases/conditional-structures-complex', phaseId]);
        break;
      case 222:
        this.router.navigate(['/authenticated/phases/operator-complex-2', phaseId]);
        break;
    }
  }

  public getUserProgress(userId: number): Observable<UsuarioProgresso[]> {
    return this.http.get<UsuarioProgresso[]>(
      `${this.url}usuarios/${userId}/progresso`,
      { headers: this.getHeaders() }
    );
  }

  public putUserProgress(userId: number, faseId: number, estrelas: number): Observable<any> {
    return this.http.put<any>(
      `${this.url}usuarios/${userId}/progresso/${faseId}?estrelas=${estrelas}`,
      {},
      { headers: this.getHeaders() }
    );
  }

  public getTempoRegeneracaoVidas(userId: number): Observable<string> {
    return this.http.get<Usuario>(`${this.url}usuarios/${userId}`, { headers: this.getHeaders() })
      .pipe(
        map((usuario: Usuario) => usuario.tempoParaProximaVida)
    );
  }

  public pausarRegeneracaoVidas(userId: number): Observable<void> {
    return this.http.put<void>(
      `${this.url}usuarios/${userId}/pausar-regeneracao`,
      null,
      { headers: this.getHeaders() }
    );
  }

  public retomarRegeneracaoVidas(userId: number): Observable<void> {
    return this.http.put<void>(
      `${this.url}usuarios/${userId}/retomar-regeneracao`,
      null,
      { headers: this.getHeaders() }
    );
  }

}
