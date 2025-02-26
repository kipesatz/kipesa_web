import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { PieChartComponent } from '@kps/charts/pie';
import {
  membershipStatsActions,
  MembershipStatsFacadeService,
} from '@kps/data/associations';
import { ButtonComponent } from '@kps/material/button';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import { Observable, of, Subscription } from 'rxjs';
import { WalletPinDialogComponent } from '../assoc-wallet';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyPipe } from '@angular/common';
import { WalletFacadeService } from '@kps/data/finances';
import { Actions, ofType } from '@ngrx/effects';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'kps-assoc-dashboard',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    ButtonComponent,
    LoadingIndicatorComponent,
    PieChartComponent,
    CurrencyPipe,
    MatDivider,
    MatIcon
  ],
  templateUrl: './assoc-dashboard.component.html',
  styleUrl: './assoc-dashboard.component.scss',
})
export class AssocDashboardComponent implements OnInit, OnDestroy {
  private membershipStatsFacade = inject(MembershipStatsFacadeService);
  private walletFacade = inject(WalletFacadeService);
  private matDialog = inject(MatDialog);
  private actions$ = inject(Actions);

  statsLoading = this.membershipStatsFacade.loading;
  statsData = this.membershipStatsFacade.membershipStats;
  walletLoading = this.walletFacade.loading;
  walletData = this.walletFacade.wallet;

  showBalance = signal(false);
  private subscriptions = new Subscription();

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
