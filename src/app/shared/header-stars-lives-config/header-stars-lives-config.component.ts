import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StartPhaseService } from '../../service/start-phase.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header-stars-lives-config',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header-stars-lives-config.component.html',
  styleUrl: './header-stars-lives-config.component.scss'
})
export class HeaderStarsLivesComponent implements OnInit {

  estrelas: number = 0;
  vidas?: number;
  userId: number | null = null;

  constructor(
    private authService: AuthService,
    private startPhaseService: StartPhaseService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    if (this.userId) {
      this.startPhaseService.carregarVidasDoBackend(this.userId);

      this.startPhaseService.getVidas().subscribe(vidas => {
        this.vidas = vidas;
      });

      this.startPhaseService.carregarEstrelasDoBackend(this.userId).subscribe(estrelas => {
        this.estrelas = estrelas;
      });
    }
  }
}
