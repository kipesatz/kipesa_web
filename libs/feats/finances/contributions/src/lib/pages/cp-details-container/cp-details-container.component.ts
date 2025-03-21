import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatTabNav, MatTabNavPanel, MatTabLink } from '@angular/material/tabs';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CpFacadeService } from '@kps/data/finances';
import { IconicButtonComponent } from '@kps/material/button';
import { MatToolbar } from '@angular/material/toolbar';

/**
 * @usageNotes
 * Responsible for fetching pre-required data for child components injected in routes under this component
 */
@Component({
  selector: 'kps-cp-details-container',
  imports: [
    IconicButtonComponent,
    MatToolbar,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    MatTabNav,
    MatTabNavPanel,
    MatTabLink,
  ],
  templateUrl: './cp-details-container.component.html',
  styles: ``,
})
export class CpDetailsContainerComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cpFacade = inject(CpFacadeService);

  cpId = signal(this.route.snapshot.params['cpId']);
  cpurpose = computed(() => this.cpFacade.selectOne(this.cpId()));
  cpError = this.cpFacade.cpError;

  tabLinks: Array<{ label: string; link: string[] | string }> = [
    { label: 'Purpose Details', link: ['details'] },
    { label: 'Contributions', link: ['contributions'] },
  ];

  ngOnInit() {
    // no cp in store & no error
    if (this.cpurpose()() !== undefined && !this.cpError()) {
      this.cpFacade.dispatchFetchOne(this.cpId());
    }
  }
}
