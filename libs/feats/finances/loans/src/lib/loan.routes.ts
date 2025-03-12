import { Routes } from '@angular/router';
import { LoansPageComponent } from './pages';
import { importProvidersFrom } from '@angular/core';
import { LoanDataModule, LoanProductDataModule } from '@kps/data/finances';
import { MembershipDataModule } from '@kps/data/associations';

export const loansRoutes: Routes = [
  {
    path: '',
    component: LoansPageComponent,
    providers: [
      importProvidersFrom([
        LoanDataModule,
        LoanProductDataModule,
        MembershipDataModule,
      ]),
    ],
  },
];
