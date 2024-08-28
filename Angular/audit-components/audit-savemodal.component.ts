import { Component, inject, model } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SaveFilterData } from '../audit-filter-exclusion.component'

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'audit-savemodal.component.html',
    standalone: true,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
    ],
  })
  export class DialogSaveModal {
    readonly dialogRef = inject(MatDialogRef<DialogSaveModal>);
    readonly data = inject<SaveFilterData>(MAT_DIALOG_DATA);
    readonly name = model(this.data.name);
  }