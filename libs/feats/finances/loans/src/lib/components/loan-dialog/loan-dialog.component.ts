import { Component, inject, signal } from '@angular/core';
import { BaseFormComponent } from '@kps/forms';
import { LoanFormComponent, LoanFormService } from '../../forms';
import { ReactiveFormsModule } from '@angular/forms';
import {
  BaseDialogComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
} from '@kps/material/dialog';
import { ButtonComponent } from '@kps/material/button';
import { LoanFacadeService, LoanPayload } from '@kps/data/finances';
import { Membership } from '@kps/data/associations';

@Component({
  selector: 'kps-loan-dialog',
  imports: [
    LoanFormComponent,
    ReactiveFormsModule,
    BaseDialogComponent,
    DialogHeaderComponent,
    DialogFooterComponent,
    ButtonComponent,
  ],
  templateUrl: './loan-dialog.component.html',
  styleUrls: ['./loan-dialog.component.html'],
})
export class LoanDialogComponent extends BaseFormComponent {
  private formService = inject(LoanFormService);
  loanForm = this.formService.loanForm();
  getFormGroup = () => this.loanForm;

  private loanFacadeService = inject(LoanFacadeService);
  loansLoading = this.loanFacadeService.loading;

  selectedMember = signal<Membership | null>(null);

  createLoan(): void {
    const _member = this.selectedMember();
    console.log("selected member", _member);
    if (this.getFormGroup().valid && _member) {
      const payload = {
        ...this.getFormGroup().value,
        member: _member.id,
      } as LoanPayload;
      this.loanFacadeService.dispatchAddOne(payload);
    }
  }
}
