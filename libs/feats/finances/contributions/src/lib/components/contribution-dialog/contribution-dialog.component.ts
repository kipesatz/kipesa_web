import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  ContributionFormComponent,
  ContributionFormService,
} from '../../forms';
import {
  MatList,
  MatListItem,
  MatListItemLine,
  MatListItemAvatar,
} from '@angular/material/list';
import { ButtonComponent } from '@kps/material/button';
import {
  contributionActions,
  ContributionFacadeService,
  ContributionPayload,
  ContributionPurpose,
  CpFacadeService,
} from '@kps/data/finances';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { BaseFormComponent } from '@kps/forms';
import {
  BaseDialogComponent,
  DialogFooterComponent,
} from '@kps/material/dialog';
import { CpOverviewDetailsComponent } from '../cp-overview-details/cp-overview-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'kps-contribution-dialog',
  imports: [
    // list
    MatList,
    MatListItem,
    MatListItemLine,
    MatListItemAvatar,

    // form
    ContributionFormComponent,

    // other
    ButtonComponent,
    LoadingIndicatorComponent,
    CurrencyPipe,

    // dialog
    BaseDialogComponent,
    MatDialogContent,
    DialogFooterComponent,
    CpOverviewDetailsComponent,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './contribution-dialog.component.html',
  styles: ``,
})
export class ContributionDialogComponent
  extends BaseFormComponent
  implements OnInit, OnDestroy
{
  private dialogRef = inject(MatDialogRef);
  private actions$ = inject(Actions);
  private contributionFacade = inject(ContributionFacadeService);
  private cpFacade = inject(CpFacadeService);
  private formService = inject(ContributionFormService);
  private dialogData: {
    cpurpose: ContributionPurpose;
    contributeForOther: boolean;
  } = inject(MAT_DIALOG_DATA);

  // data
  private subscriptions = new Subscription();
  cpLoading = this.cpFacade.cpsLoading;
  contributions = this.contributionFacade.allContributions;

  getFormGroup = () => this.formService.contributionForm();

  addContribution(): void {
    const payload = this.getFormGroup().value as ContributionPayload;
    this.contributionFacade.addOne(payload);
  }

  viewAllContributors(): void {
    // TODO: Implement fetching other contributors
  }

  get cpurpose() {
    return this.dialogData.cpurpose;
  }

  get isForOther() {
    return this.dialogData.contributeForOther;
  }

  ngOnInit(): void {
    // close dialog once contribuition is added
    this.subscriptions.add(
      this.actions$
        .pipe(
          ofType(contributionActions.createContributionSuccess),
          map(() => true)
        )
        .subscribe(() => this.dialogRef.close())
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
