import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IResponseModal } from '../../models/signup-modal';
import { IInfoModalRequest } from '../../models/info-modal.model';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss'
})
export class InfoModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public params: IInfoModalRequest,
    public dialogRef: MatDialogRef<InfoModalComponent, IResponseModal<boolean>>,
  ) { }

  register(){
    let response: IResponseModal<boolean> = {
      mode: 'CONFIRMATION',
      dispatcher: 'OK',
      content: true
    }
    this.dialogRef.close(response)
  }

  close(){
    let response: IResponseModal<boolean> = {
      mode: 'CONFIRMATION',
      dispatcher: 'CANCEL',
      content: false
    }
    this.dialogRef.close(response)
  }

}
