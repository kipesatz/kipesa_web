import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import {
  ContributionFacadeService,
  ContributionPurpose,
  CpFacadeService,
} from '@kps/data/finances';
import { ContributionsTableComponent } from '../../components';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

/**A component for rendering contributions that belong to specific contribution purpose */
@Component({
  selector: 'kps-cp-contributions',
  imports: [ContributionsTableComponent],
  templateUrl: './cp-contributions.component.html',
  styles: ``,
})
export class CpContributionsComponent implements OnInit {
  // injections
  private contributionFacade = inject(ContributionFacadeService);
  private route = inject(ActivatedRoute);
  private cpFacade = inject(CpFacadeService);

  
  // props
  readonly cpId = this.route.parent?.snapshot.paramMap.get('cpId');
  cpurpose!: Signal<ContributionPurpose>;
  contributions = this.contributionFacade.allContributions();

  tableTitle = computed(() => {
    if (this.cpurpose()) {
      return `Contributions for ${this.cpurpose().title}`;
    }
    return 'Contributions';
  });

  ngOnInit(): void {
    if (this.cpId) {
      // set cpurpose
      this.cpurpose = this.cpFacade.selectOne(this.cpId);

      if (!this.cpurpose()) {
        this.cpFacade.dispatchFetchOne(this.cpId);
      }

      // fetch it's contributions
      this.contributionFacade.fetchAll(
        new HttpParams({ fromObject: { purpose: this.cpId } })
      );
    }
  }
}
