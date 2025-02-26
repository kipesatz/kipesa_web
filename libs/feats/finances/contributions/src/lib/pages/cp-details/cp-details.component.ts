import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ContributionPurpose, CpFacadeService } from '@kps/data/finances';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardContent,
} from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { CurrencyPipe } from '@angular/common';

import { PieChartComponent } from '@kps/charts/pie';
import { CpOverviewDetailsComponent } from '../../components';
import { ActivatedRoute } from '@angular/router';
import { LoadingIndicatorComponent } from '@kps/material/progress';

@Component({
  selector: 'kps-cp-details',
  standalone: true,
  imports: [
    // card
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatProgressBar,
    CurrencyPipe,
    PieChartComponent,
    LoadingIndicatorComponent,
    CpOverviewDetailsComponent,
  ],
  templateUrl: './cp-details.component.html',
  styleUrls: ['./cp-details.component.scss'],
})
export class CpDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cpFacade = inject(CpFacadeService);

  readonly cpId = this.route.parent?.snapshot.paramMap.get('cpId');
  cpLoading = this.cpFacade.cpsLoading;
  cpurpose!: Signal<ContributionPurpose>;

  progressPercentage = computed(() => {
    const _cpurpose = this.cpurpose();
    if (_cpurpose) {
      const collected = _cpurpose.minAmount;
      const target = _cpurpose.targetAmount;
      return Math.round((collected / target) * 100);
    }
    return 0;
  });

  progressColor = computed(() => {
    const progress = this.progressPercentage();
    if (progress < 30) return 'warn';
    if (progress < 70) return 'accent';
    return 'primary';
  });

  ngOnInit(): void {
    // no need to dispatch an event to fetch the cpurpose if is found in store as it is dispatched from the parent component
    if (this.cpId) {
      this.cpurpose = this.cpFacade.selectOne(this.cpId);
      // when nothing in store, dispatch event fetch it
      if (!this.cpurpose()) {
        this.cpFacade.dispatchFetchOne(this.cpId);
      }
    }
  }
}
