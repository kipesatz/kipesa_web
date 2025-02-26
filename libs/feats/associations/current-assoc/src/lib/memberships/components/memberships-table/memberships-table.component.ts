import { DatePipe } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { RouterService } from '@kps/core/router';
import { MembershipFacadeService } from '@kps/data/associations';
import { SearchFieldComponent } from '@kps/forms/fields';
import { DataTableComponent, TableColumn } from '@kps/material/table';

@Component({
  selector: 'kps-memberships-tbl',
  imports: [
    DataTableComponent,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatChip,
    DatePipe,
    RouterLink,
    SearchFieldComponent,
  ],
  templateUrl: './memberships-table.component.html',
  styleUrl: './memberships-table.component.scss',
})
export class MembershipsTableComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.searchTerm()) this.refreshData();
    });
  }
  // injections
  private membershipFacade = inject(MembershipFacadeService);
  private routerService = inject(RouterService);

  // inputs & outputs
  tableTitle = input('Memberships');

  // data sources
  allMemberships = this.membershipFacade.memberships;
  membershipsLoading = this.membershipFacade.loading;
  totalMemberships = this.membershipFacade.totalMemberships;
  membershipsCount = this.membershipFacade.membershipsCount;

  // custom templates
  memberTemplate = viewChild.required<TemplateRef<unknown>>('memberTemplate');
  phoneTmpl = viewChild.required<TemplateRef<unknown>>('phoneTmpl');
  emailTmpl = viewChild.required<TemplateRef<unknown>>('emailTmpl');
  statusTemplate = viewChild.required<TemplateRef<unknown>>('statusTemplate');
  roleTemplate = viewChild.required<TemplateRef<unknown>>('roleTemplate');
  joinedTmpl = viewChild.required<TemplateRef<unknown>>('joinedTmpl');
  actionsTemplate = viewChild.required<TemplateRef<unknown>>('actionsTemplate');

  searchTerm = signal('');
  columns: TableColumn[] = [];
  visibleColumns = [
    'id',
    'user',
    'phoneNumber',
    'email',
    'status',
    'role',
    'joinedAt',
    'actions',
  ];

  ngOnInit() {
    // Define columns after templates are available
    this.columns = [
      {
        key: 'id',
        label: 'ID',
      },
      {
        key: 'user',
        label: 'Member',
        sortable: true,
        template: this.memberTemplate(),
      },
      { key: 'phoneNumber', label: 'Phone', template: this.phoneTmpl() },
      { key: 'email', label: 'Email', template: this.emailTmpl() },
      {
        key: 'status',
        label: 'Status',
        template: this.statusTemplate(),
      },
      {
        key: 'role',
        label: 'Role',
        template: this.roleTemplate(),
      },
      {
        key: 'joinedAt',
        label: 'Date Joined',
        template: this.joinedTmpl(),
        sortable: true,
      },
      {
        key: 'actions',
        label: 'Actions',
        template: this.actionsTemplate(),
      },
    ];
  }

  // Template helper methods
  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'info';
      case 'rejected':
        return 'danger';
      case 'approved':
        return 'success';
      default:
        return 'info';
    }
  }

  onEdit(row: unknown) {
    console.log('Edit:', row);
  }

  onFilterChange(filters: Record<string, unknown>) {
    console.log('Active filters:', filters);
    // Implement filter logic
  }

  onSelectionChange(selected: unknown[]) {
    console.log('Selected:', selected);
  }

  onSearch(term: string) {
    console.log(`onSearch called with searchTerm ${term}`);
  }

  refreshData() {
    this.routerService.updateRouterState({ q: this.searchTerm() }).then(() => {
      this.membershipFacade.dispatchFetchAll(
        this.routerService.getAsHttpParams()
      );
    });
  }

  rejectRequest(items: unknown[]) {
    // Implement delete logic
    console.log('items to delete are');
    console.table(items);
  }

  onAdd() {
    console.log('onAdd method called');
  }

  onExport() {
    console.log('onExport method called');
  }
}
