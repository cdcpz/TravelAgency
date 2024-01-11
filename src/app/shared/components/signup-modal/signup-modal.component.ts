import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { SignupService } from './service/signup.service';
import { NgFor } from '@angular/common';
import { ISignup, ISignupRequestModal, IResponseModal } from '../../models/signup-modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISelectOption } from '../../models/response';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgFor
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './signup-modal.component.html',
  styleUrl: './signup-modal.component.scss'
})
export class SignupModalComponent implements OnInit {

  basicForm!: FormGroup;
  contacForm!: FormGroup;
  credentialForm!: FormGroup;
  documents: ISelectOption[] = []
  genders: ISelectOption[] = []

  constructor(private formBuilder: FormBuilder,
    private readonly signupService: SignupService,
    public dialogRef: MatDialogRef<SignupModalComponent, IResponseModal<ISignup>>,
    @Inject(MAT_DIALOG_DATA) public params: ISignupRequestModal
  ) {
    this.builder()
  }

  ngOnInit(): void {
    this.getSelectOpcion()
    this.dataInitial()
  }

  get title() {
    return this.params.title
  }

  get showPasswordField() {
    return this.params.showPassword
  }

  builder() {
    this.basicForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      documentType: [-1, [Validators.required, Validators.min(0)]],
      document: [0, [Validators.required]],
      gender: [-1, [Validators.required, Validators.min(0)]],
      birth: [Date, [Validators.required]]
    })
    this.contacForm = this.formBuilder.group({
      phone: ['', [Validators.required]],
      indicative: [0,[Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      email: ['', [Validators.required, Validators.email]]
    })
    this.credentialForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  dataInitial(){
    this.basicForm.patchValue({...this.params.content})
    this.contacForm.patchValue({...this.params.content})
  }

  getSelectOpcion() {
    this.signupService.getTypes().subscribe(option => {
      this.documents = option.data["documentTypes"]
      this.genders = option.data["genders"]
    })
  }

  close() {
    this.basicForm.markAllAsTouched()
    this.contacForm.markAllAsTouched()
    this.credentialForm.markAllAsTouched()
    if (this.basicForm.invalid || this.contacForm.invalid || (this.params.showPassword && this.credentialForm.invalid)) return
    var response: IResponseModal<ISignup> = {
      mode: this.params.mode,
      dispatcher: 'OK',
      content: {
        ...this.basicForm.value,
        ...this.contacForm.value,
        ...this.credentialForm.value
      }
    }
    this.dialogRef.close(response)
  }

}
