import { CurrencyPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { RouterService } from '@kps/core/router';
import { ActivatedAssociationService } from '@kps/data/associations';
import { Contribution, ContributionFacadeService } from '@kps/data/finances';
import { SearchFieldComponent } from '@kps/forms/fields';
import { IconicButtonComponent } from '@kps/material/button';
import { DataTableComponent, TableColumn } from '@kps/material/table';

@Component({
  selector: 'kps-my-contributions',
  imports: [
    DataTableComponent,
    SearchFieldComponent,
    IconicButtonComponent,
    CurrencyPipe,
    NgOptimizedImage,
    DatePipe,
  ],
  templateUrl: './my-contributions.component.html',
  styleUrl: './my-contributions.component.scss',
})
export class MyContributionsComponent implements OnInit {
  constructor() {
    // this.initCols();

    effect(() => {
      if (this.searchTerm() !== null) {
        this.refreshData();
      }
    });
  }
  // injections
  private contributionFacade = inject(ContributionFacadeService);
  private routerService = inject(RouterService);
  private currAssoc = inject(ActivatedAssociationService);

  // side effects data
  myContributions$ = this.contributionFacade.allContributions;
  loading$ = this.contributionFacade.loading;

  // custom templates
  amtTmpl = viewChild.required<TemplateRef<unknown>>('amtTmpl');
  statusTmpl = viewChild.required<TemplateRef<unknown>>('statusTmpl');
  payMethodTmpl = viewChild.required<TemplateRef<unknown>>('payMethodTmpl');
  createdTmpl = viewChild.required<TemplateRef<unknown>>('createdTmpl');

  searchTerm = signal('');
  tableCols = signal<TableColumn[]>([]);
  visibleColumns = [
    'transactionRef',
    'purpose',
    'status',
    'amount',
    'paymentMethod',
    'createdOn',
  ];

  currAssocName = computed(() => this.currAssoc.getName() ?? '');

  ngOnInit(): void {
    this.initCols();

    this.contributionFacade.fetchSelfContributions(
      this.routerService.getAsHttpParams()
    );
  }

  refreshData(): void {
    // update qparams & dispatch
    this.routerService
      .updateRouterState({ q: this.searchTerm() })
      .then(() =>
        this.contributionFacade.fetchSelfContributions(
          this.routerService.getAsHttpParams()
        )
      );
  }

  private initCols(): void {
    this.tableCols.set([
      {
        key: 'transactionRef',
        label: 'Transaction Ref',
        template: (value) => (value as Contribution).transactionRef,
      },
      {
        key: 'purpose',
        label: 'Purpose',
        template: (value) => (value as Contribution).purpose.title,
      },
      {
        key: 'status',
        label: 'Status',
        template: this.statusTmpl(),
      },
      {
        key: 'amount',
        label: 'Amount',
        template: this.amtTmpl(),
      },
      {
        key: 'paymentMethod',
        label: 'Payment Method',
        template: this.payMethodTmpl(),
      },
      {
        key: 'createdOn',
        label: 'Contribution Date',
        template: this.createdTmpl(),
      },
    ]);
  }
}
