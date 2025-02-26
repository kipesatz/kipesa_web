import { Routes } from '@angular/router';
import { PayMethodsPageComponent } from './pages';

/**
 * @usageNotes
 * The users of these routes must include providers from `PaymentMethodDataModule`
 * @see {@link PaymentMethodDataModule}
 *
 * @publicApi
 */
export const paymentMethodsRoutes: Routes = [
  { path: '', component: PayMethodsPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
