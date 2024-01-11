import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LangService } from '../../../../shared/services/lang.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {

  authForm: FormGroup
  constructor(
    private readonly lang: LangService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginModalComponent>,
  ) {
    this.authForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(0)]],
    })
  }

  get TEXT() { return this.lang.current }

  close(){
    this.authForm.markAllAsTouched()
    if(this.authForm.invalid) return

    this.dialogRef.close(this.authForm.value)
  }
}
