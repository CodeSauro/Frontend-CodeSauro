import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderHomeComponent } from '../../../shared/header-home/header-home.component';
import { Usuario } from '../../../modules/usuario.module';
import { AuthService } from '../../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    HeaderHomeComponent,
    RouterLink,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public listaUsuarios: Usuario[] = [];
  public id: any;

  constructor(
    private service: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public auth(login: string, senha: string) {
    this.service.auth({ login, senha }).subscribe(
      res => {
        this.router.navigate(['/authenticated/map'])
      },
      error => {
        // this.openDialog()
      }
    );
  }

  @ViewChild('senha') senhaInput!: ElementRef;
  senhaVisivel: boolean = false;

  togglePasswordVisibility() {
    this.senhaVisivel = !this.senhaVisivel;
  }

  get iconEye() {
    return this.senhaVisivel ? 'icon-eye-close.png' : 'icon-eye.png';
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.html',
  styleUrls: ['./dialog-elements-example-dialog.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogElementsExampleDialog {}
