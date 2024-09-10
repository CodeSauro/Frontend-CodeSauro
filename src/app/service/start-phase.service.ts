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

  private url: string = 'http://localhost:8080/';
  private vidasSubject: BehaviorSubject<number> = new BehaviorSubject<number>(5);  // Inicializando com 5 vidas temporárias
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

  // Método para carregar as vidas do backend
  public carregarVidasDoBackend(userId: number): void {
    this.http.get<Usuario>(`${this.url}usuarios/${userId}`, { headers: this.getHeaders() })
      .subscribe((usuario: Usuario) => {
        this.setVidas(usuario.vidas);  // Atualiza o BehaviorSubject com o valor de vidas carregado
      }, error => {
        console.error('Erro ao carregar vidas do backend:', error);
      });
  }

  // Carregar estrelas do backend
  public carregarEstrelasDoBackend(userId: number): Observable<number> {
    return this.http.get<Usuario>(`${this.url}usuarios/${userId}`, { headers: this.getHeaders() })
      .pipe(
        map((usuario: Usuario) => usuario.estrelas)
      );
  }

  // Atualizar o valor das vidas no BehaviorSubject
  public setVidas(vidas: number): void {
    this.vidasSubject.next(vidas);
    this.setVidasZeradas(vidas === 0);
  }

  // Método para obter o valor das vidas como um Observable
  public getVidas(): Observable<number> {
    return this.vidasSubject.asObservable();
  }

  // Verifica se as vidas chegaram a zero
  public verificarVidasZeradas(): boolean {
    return this.vidasZeradas;
  }

  // Define se as vidas foram zeradas
  private setVidasZeradas(zeradas: boolean): void {
    this.vidasZeradas = zeradas;
  }

  // Atualiza o número de vidas após uma resposta incorreta
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
          vidasAtuais = Math.max(vidasAtuais - 1, 0);  // Reduz uma vida em caso de erro
          this.setVidas(vidasAtuais);  // Atualiza o BehaviorSubject com o novo valor
        }
      })
    );
  }

  // Método para iniciar uma fase com verificação de vidas
  public startPhaseService(phaseId: number): void {
    if (this.verificarVidasZeradas()) {
      this.router.navigate(['/authenticated/punctuation/without-life-locked-map']);  // Redireciona se as vidas estiverem zeradas
      return;
    }

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
  }

  // Navegação para diferentes fases com base no RA
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
    }
  }

  // Carregar progresso do usuário no backend
  public getUserProgress(userId: number): Observable<UsuarioProgresso[]> {
    return this.http.get<UsuarioProgresso[]>(
      `${this.url}usuarios/${userId}/progresso`,
      { headers: this.getHeaders() }
    );
  }

  // Atualizar o progresso do usuário
  public putUserProgress(userId: number, faseId: number, estrelas: number): Observable<any> {
    return this.http.put<any>(
      `${this.url}usuarios/${userId}/progresso/${faseId}?estrelas=${estrelas}`,
      {},
      { headers: this.getHeaders() }
    );
  }

  // Método para obter o tempo de regeneração de vidas
  public getTempoRegeneracaoVidas(userId: number): Observable<string> {
    return this.http.get<string>(`${this.url}usuarios/${userId}/tempo-regeneracao`, {
      headers: this.getHeaders()
    });
  }

}
