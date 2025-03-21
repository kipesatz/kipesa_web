import { DatePipe } from '@angular/common';
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
import {
  ActivatedAssociationService,
  Association,
  Membership,
  MembershipFacadeService,
} from '@kps/data/associations';
import { SearchFieldComponent } from '@kps/forms/fields';
import { IconicButtonComponent } from '@kps/material/button';
import { DataTableComponent, TableColumn } from '@kps/material/table';
import { ConfirmSwitchAssocDialogComponent } from '@kps/layout/association';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'kps-my-assoc-enrollments',
  imports: [
    DataTableComponent,
    SearchFieldComponent,
    DatePipe,
    IconicButtonComponent,
  ],
  templateUrl: './my-assoc-enrollments.component.html',
  styleUrl: './my-assoc-enrollments.component.scss',
})
export class MyAssocEnrollmentsComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.searchTerm()) this.refreshData();
    });
  }
  private myMembershipFacade = inject(MembershipFacadeService);
  private routerService = inject(RouterService);
  private currAssocService = inject(ActivatedAssociationService);
  private diagService = inject(MatDialog);
  private router = inject(Router);

  // side effects data
  loading$ = this.myMembershipFacade.loading;
  myMemberships$ = this.myMembershipFacade.memberships;

  // templates
  isActiveTmpl = viewChild.required<TemplateRef<unknown>>('isActiveTmpl');
  joinedTmpl = viewChild.required<TemplateRef<unknown>>('joinedTmpl');
  openAssocTmpl = viewChild.required<TemplateRef<unknown>>('openAssocTmpl');

  searchTerm = signal('');
  currAssocId = computed(() => this.currAssocService.getId());
  columns: TableColumn[] = [];

  visibleColumns = [
    'name',
    'isActive',
    'role',
    'status',
    'joinedAt',
    'openAssoc',
  ];

  refreshData(): void {
    // update qparams & dispatch
    this.routerService
      .updateRouterState({ q: this.searchTerm() })
      .then(() =>
        this.myMembershipFacade.fetchMyMemberships(
          this.routerService.getAsHttpParams()
        )
      );
  }

  ngOnInit(): void {
    this.initCols();

    this.myMembershipFacade.fetchMyMemberships(
      this.routerService.getAsHttpParams()
    );
  }

  openAssociation(association: Association): void {
    const dialogRef = this.diagService.open(ConfirmSwitchAssocDialogComponent, {
      data: { association },
    });

    dialogRef.afterClosed().subscribe((shouldSwitch: boolean) => {
      if (shouldSwitch) {
        // switch to selected
        this.currAssocService.switchCurAssoc(association);

        // navigate to assoc dashboard
        this.router.navigate(['/associations', association.id, 'dashboard']);
      }
    });
  }

  private initCols(): void {
    this.columns = [
      {
        key: 'name',
        label: 'Association Name',
        sortable: true,
        template: (membership) => (membership as Membership).association.name,
      },
      {
        key: 'role',
        label: 'Role',
        template: (membership) => (membership as Membership).role.name,
      },
      {
        key: 'status',
        label: 'Enrollment Status',
        template: (membership) => (membership as Membership).status,
      },
      {
        key: 'joinedAt',
        label: 'Join Date',
        template: this.joinedTmpl(),
      },
      {
        key: 'isActive',
        label: 'Association Status',
        template: this.isActiveTmpl(),
      },
      {
        key: 'openAssoc',
        label: '',
        template: this.openAssocTmpl(),
      },
    ];
  }
}
