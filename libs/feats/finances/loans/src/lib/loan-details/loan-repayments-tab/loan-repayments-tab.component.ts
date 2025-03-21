import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepaymentsTableComponent } from './repayments-table/repayments-table.component';

/**
 * @usageNotes
 * A component that shows both successfully repayments and repayments schedule
 */
@Component({
  selector: 'kps-loan-repayments-tab',
  imports: [RepaymentsTableComponent],
  templateUrl: './loan-repayments-tab.component.html',
  styleUrl: './loan-repayments-tab.component.scss',
})
export class LoanRepaymentsTabComponent {}
