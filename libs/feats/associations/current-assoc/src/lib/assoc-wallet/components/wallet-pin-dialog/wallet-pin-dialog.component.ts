import { Component, inject, OnInit } from '@angular/core';
import { InputFieldComponent } from '@kps/forms/fields';
import { BaseFormComponent } from '@kps/forms';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '@kps/material/button';

@Component({
  selector: 'kps-wallet-pin-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ButtonComponent,
  ],
  templateUrl: './wallet-pin-dialog.component.html',
  styles: ``,
})
export class WalletPinDialogComponent
  extends BaseFormComponent
  implements OnInit
{
  dialogRef = inject(MatDialogRef<WalletPinDialogComponent>);
  private fg!: FormGroup;

  getFormGroup = () => this.fg;

  onSubmit(): void {
    if (this.getFormGroup().valid) {
      this.dialogRef.close(this.getFormGroup().value.pin);
    }
  }

  ngOnInit(): void {
    this.fg = new FormGroup({
      pin: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('[0-9]*'),
      ]),
    });
  }
}
