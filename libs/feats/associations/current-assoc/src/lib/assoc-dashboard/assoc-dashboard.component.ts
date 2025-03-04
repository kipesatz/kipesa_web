import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { LineChartComponent } from '@kps/charts/line';
import {
  membershipStatsActions,
  MembershipStatsFacadeService,
} from '@kps/data/associations';
import { ButtonComponent, IconicButtonComponent } from '@kps/material/button';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import { Observable, of, Subscription } from 'rxjs';
import { WalletPinDialogComponent } from '../assoc-wallet';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyPipe } from '@angular/common';
import { WalletFacadeService } from '@kps/data/finances';
import { Actions, ofType } from '@ngrx/effects';
import { MatIcon } from '@angular/material/icon';
import { StatCardComponent } from '@kps/material/card';
import { CdkDragDrop, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { MatSidenav } from '@angular/material/sidenav';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatNavList,
} from '@angular/material/list';
import { ActivityListComponent } from '@kps/material/list';
import { ChartConfig } from '@kps/charts';
import { MatToolbar } from '@angular/material/toolbar';

interface Widget {
  id: string;
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'kps-assoc-dashboard',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ButtonComponent,
    LoadingIndicatorComponent,
    StatCardComponent,
    LineChartComponent,
    CurrencyPipe,
    MatIcon,
    CdkDropList,
    CdkDrag,
    MatSidenav,
    ActivityListComponent,
    MatListItem,
    MatListItemIcon,
    MatListItemLine,
    MatNavList,
    IconicButtonComponent,
    MatToolbar,
  ],
  templateUrl: './assoc-dashboard.component.html',
  styleUrl: './assoc-dashboard.component.scss',
})
export class AssocDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('widgetSidenav') widgetSidenav!: MatSidenav;

  private membershipStatsFacade = inject(MembershipStatsFacadeService);
  private walletFacade = inject(WalletFacadeService);
  private matDialog = inject(MatDialog);
  private actions$ = inject(Actions);

  statsLoading = this.membershipStatsFacade.loading;
  statsData = this.membershipStatsFacade.membershipStats;
  walletLoading = this.walletFacade.loading;
  walletData = this.walletFacade.wallet;

  showBalance = signal(false);
  private editMode = signal(false);
  private activeWidgetIds = signal<string[]>([
    'financial-overview',
    'membership-stats',
    'loan-status',
    'cash-flow',
    'recent-activities',
  ]);

  // Financial Data (mock data - replace with actual service calls)
  totalAssets = 1500000;
  monthlyCollections = 75000;
  outstandingLoans = 500000;
  pendingLoans = 15;
  activeLoans = 45;
  defaultedLoans = 3;

  // Cash Flow Data (mock data - replace with actual service)
  cashFlowData = signal([
    { date: '2024-01', income: 50000, expenses: 30000 },
    { date: '2024-02', income: 55000, expenses: 32000 },
    { date: '2024-03', income: 60000, expenses: 35000 },
  ]);
  cashFlowLoading = signal(false);

  // Recent Activities (mock data - replace with actual service)
  recentActivities = signal([
    {
      type: 'loan',
      description: 'New loan application received',
      timestamp: new Date(),
    },
    { type: 'member', description: 'New member joined', timestamp: new Date() },
    {
      type: 'payment',
      description: 'Monthly collection completed',
      timestamp: new Date(),
    },
  ]);
  activitiesLoading = signal(false);

  private subscriptions = new Subscription();

  // Available Widgets
  availableWidgets = computed(() => {
    const allWidgets: Widget[] = [
      {
        id: 'financial-overview',
        name: 'Financial Overview',
        icon: 'account_balance',
        description: 'Shows key financial metrics',
      },
      {
        id: 'membership-stats',
        name: 'Membership Statistics',
        icon: 'people',
        description: 'Overview of membership status',
      },
      {
        id: 'loan-status',
        name: 'Loan Status',
        icon: 'payments',
        description: 'Current loan statistics',
      },
      {
        id: 'cash-flow',
        name: 'Cash Flow Trends',
        icon: 'trending_up',
        description: 'Monthly cash flow analysis',
      },
      {
        id: 'recent-activities',
        name: 'Recent Activities',
        icon: 'history',
        description: 'Latest association activities',
      },
    ];

    return allWidgets.filter(
      (widget) => !this.activeWidgetIds().includes(widget.id)
    );
  });

  // Widget Management Methods
  isEditMode = computed(() => this.editMode());

  activeWidgets = computed(() => this.activeWidgetIds());

  toggleEditMode(): void {
    this.editMode.update((current) => !current);
  }

  hasWidget(widgetId: string): boolean {
    return this.activeWidgetIds().includes(widgetId);
  }

  addWidget(widgetId: string): void {
    this.activeWidgetIds.update((current) => [...current, widgetId]);
    this.widgetSidenav.close();
  }

  removeWidget(widgetId: string): void {
    this.activeWidgetIds.update((current) =>
      current.filter((id) => id !== widgetId)
    );
  }

  openWidgetSidenav(): void {
    this.widgetSidenav.open();
  }

  resetWidgetDefaults(): void {
    const defaultWidgets = [
      'financial-overview',
      'membership-stats',
      'recent-activities',
    ];
    this.activeWidgetIds.set(defaultWidgets);
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (this.isEditMode()) {
      const currentWidgets = [...this.activeWidgetIds()];
      const item = currentWidgets[event.previousIndex];
      currentWidgets.splice(event.previousIndex, 1);
      currentWidgets.splice(event.currentIndex, 0, item);
      this.activeWidgetIds.set(currentWidgets);
    }
  }

  openPinDialog(): void {
    const dialogRef = this.matDialog.open(WalletPinDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((pin: string) => {
      if (pin) {
        // Verify PIN logic here
        this.verifyPin(pin).subscribe((isValid) => {
          if (isValid) {
            this.showBalance.set(true);
          }
        });
      }
    });
  }

  private verifyPin(pin: string): Observable<boolean> {
    // Add your PIN verification logic here
    // This could call a service to verify the PIN
    return of(pin === '1234'); // Example verification
  }

  chartData = computed(() => {
    return [
      {
        name: 'Active Memberships',
        value: this.statsData()?.activeMemberships || 0,
      },
      {
        name: 'Pending Memberships',
        value: this.statsData()?.pendingMemberships || 0,
      },
      {
        name: 'Rejected Memberships',
        value: this.statsData()?.rejectedMemberships || 0,
      },
    ];
  });

  cashFlowChartConfig = computed<ChartConfig>(() => ({
    title: 'Cash Flow Trends',
    subtitle: 'Monthly Income vs Expenses',
    series: [
      {
        name: 'Income',
        type: 'line',
        data: this.cashFlowData().map((d) => ({ x: d.date, y: d.income })),
        color: '#4CAF50',
        smooth: true,
        areaStyle: { opacity: 0.2 },
      },
      {
        name: 'Expenses',
        type: 'line',
        data: this.cashFlowData().map((d) => ({ x: d.date, y: d.expenses })),
        color: '#F44336',
        smooth: true,
        areaStyle: { opacity: 0.2 },
      },
    ],
    xAxis: {
      name: 'Month',
      type: 'category',
    },
    yAxis: {
      name: 'Amount',
      type: 'value',
    },
  }));

  ngOnInit(): void {
    // load membership stats
    this.membershipStatsFacade.loadMembershipStats();

    // wait once membership stats are loaded, load wallet
    this.subscriptions.add(
      this.actions$
        .pipe(ofType(membershipStatsActions.loadMembershipStatsSuccess))
        .subscribe(() => {
          this.walletFacade.loadWallet();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
