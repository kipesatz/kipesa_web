import { Component, inject, OnInit } from '@angular/core';
import { ContributionsTableComponent } from '../../components';
import { ContributionFacadeService } from '@kps/data/finances';
import { RouterService } from '@kps/core/router';

/**Show all contributions that belong to this particular Association */
@Component({
  selector: 'kps-contributions-pg',
  imports: [ContributionsTableComponent],
  templateUrl: './contributions-page.component.html',
  styleUrl: './contributions-page.component.scss',
})
export class ContributionsPageComponent implements OnInit {
  private contributionFacade = inject(ContributionFacadeService);
  private routerService = inject(RouterService);

  ngOnInit(): void {
    this.contributionFacade.fetchAll(
      this.routerService.getAsHttpParams()
    );
  }
}
