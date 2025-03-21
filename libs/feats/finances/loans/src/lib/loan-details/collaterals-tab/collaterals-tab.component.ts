import { Component, inject, OnInit } from '@angular/core';
import { CollateralsTableComponent } from './collaterals-table/collaterals-table.component';
import { StatCardComponent } from '@kps/material/card';
import {
  COLLATERAL_STATUS_TOKEN,
  CollateralFacadeService,
} from '@kps/data/finances';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '@kps/core/router';

@Component({
  selector: 'kps-collaterals-tab',
  imports: [CollateralsTableComponent, StatCardComponent],
  templateUrl: './collaterals-tab.component.html',
  styleUrl: './collaterals-tab.component.scss',
})
export class CollateralsTabComponent implements OnInit {
  collateralStats = inject(COLLATERAL_STATUS_TOKEN);
  private curRoute = inject(ActivatedRoute);
  private collateralFacade = inject(CollateralFacadeService);
  private routerService = inject(RouterService);

  ngOnInit(): void {
    // load stats first then load collaterals
    const loanId =
      this.curRoute.snapshot?.parent?.parent?.paramMap.get('loanId');
    if (loanId) {
      this.collateralFacade.dispatchFetchLoanCollaterals(
        loanId,
        this.routerService.getAsHttpParams()
      );
    }
  }
}
