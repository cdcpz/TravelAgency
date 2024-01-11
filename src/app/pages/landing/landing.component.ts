import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoModalComponent } from '../../shared/components/info-modal/info-modal.component';
import { ROL_REDIRECT } from '../../app.routes.permission';
import { LocalDbPersist } from '../../shared/services/db.service';
import { ILoginResponse } from './models/login.model';
import { DB_FLAGS } from '../../shared/models/db.model';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { SignupModalComponent } from '../../shared/components/signup-modal/signup-modal.component';
import { INIT_SIGNUP, IResponseModal, ISignup, ISignupRequestModal } from '../../shared/models/signup-modal';
import { SignupService } from '../../shared/components/signup-modal/service/signup.service';
import { IInfoModalRequest } from '../../shared/models/info-modal.model';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ToolbarComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  formValue = {...INIT_SIGNUP}

  constructor(
    public dialog: MatDialog,
    private readonly loginService: LoginService,
    private readonly signupService: SignupService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    var credential = LocalDbPersist<ILoginResponse>().get(DB_FLAGS.CREDENTIAL)
    if(credential) {
      this.router.navigateByUrl(ROL_REDIRECT[credential.rol.id])
    }
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      this.loginService.authentication(result).subscribe(data => {
        if (data.status != 200) {
          this._snackBar.open(data.message, 'cerrar', {
            duration: 3000
          })
          return
        }
        this.router.navigateByUrl(ROL_REDIRECT[data.data.rol.id])
      })
    });
  }

  openDialogRegistrar(): void {
    let params: ISignupRequestModal = {
      title: 'Registrar viajero',
      showPassword: true,
      mode: 'ADD',
      content: this.formValue
    }
    const dialogRef = this.dialog.open(SignupModalComponent, {
      data: params
    });
    dialogRef.afterClosed().subscribe((result:IResponseModal<ISignup>) => {
      if(!result) return
      if(result.dispatcher != 'OK') return
      this.openDialogConfirmation()
      this.formValue = result.content
    });
  }

  openDialogConfirmation() {
    var params: IInfoModalRequest = {
      title: "Atención",
      description: "¿Está seguro que desea guardar sus datos?",
      btnTitle: "Sí, continuar",
      icon: "info"
    }
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: params
    });
    dialogRef.afterClosed().subscribe((result:IResponseModal<boolean>) => {
      if (!result) {
        this.openDialogRegistrar()
        return
      }
      if(result.dispatcher != 'OK') {
        this.openDialogRegistrar()
        return
      }
      this.signupService.post(this.formValue).subscribe(data => {
        var params: IInfoModalRequest = {
          title: "Atención",
          description: data.message,
          btnTitle: "Aceptar",
          icon: "info"
        }
        const dialogRef = this.dialog.open(InfoModalComponent, {
          data: params
        })
        this.formValue = {...INIT_SIGNUP}
        dialogRef.afterClosed().subscribe(result => {
          if(data.status != 200) this.openDialogRegistrar()
        });
      },
      error => {
        var params: IInfoModalRequest = {
          title: "Atención",
          description: "Ha ocurrido un error desconocido",
          btnTitle: "Aceptar",
          icon: "info"
        }
        const dialogRef = this.dialog.open(InfoModalComponent, {
          data: params
        })
        this.formValue = {...INIT_SIGNUP}
        dialogRef.afterClosed().subscribe(result => {
          this.openDialogRegistrar()
        });
      })
    });
  }
}
