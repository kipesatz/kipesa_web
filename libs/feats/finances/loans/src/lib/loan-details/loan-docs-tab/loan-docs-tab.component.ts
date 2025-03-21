import { Component, inject, OnInit } from '@angular/core';
import { LoanFilesTableComponent } from './loan-files-table/loan-files-table.component';
import { ActivatedRoute } from '@angular/router';
import {
  LOAN_FILE_STATUS_TOKEN,
  LoanFileFacadeService,
} from '@kps/data/finances';
import { RouterService } from '@kps/core/router';
import { StatCardComponent } from '@kps/material/card';

@Component({
  selector: 'kps-loan-docs-tab',
  imports: [LoanFilesTableComponent, StatCardComponent],
  templateUrl: './loan-docs-tab.component.html',
  styleUrl: './loan-docs-tab.component.scss',
})
export class LoanDocsTabComponent implements OnInit {
  private curRoute = inject(ActivatedRoute);
  private routerService = inject(RouterService);
  private loanFileFacade = inject(LoanFileFacadeService);
  readonly loanFileStates = inject(LOAN_FILE_STATUS_TOKEN);

  // data
  loanId = this.curRoute.snapshot?.parent?.parent?.paramMap.get('loanId');

  ngOnInit(): void {
    if (this.loanId) {
      this.loanFileFacade.dispatchLoadLoanFiles(
        this.loanId,
        this.routerService.getAsHttpParams()
      );
    }
  }
}
