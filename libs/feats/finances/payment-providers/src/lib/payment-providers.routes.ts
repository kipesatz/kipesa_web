import { Routes } from '@angular/router';
import { PaymentProvidersPageComponent } from './pages';

/**
 * @usageNotes
 * The users of these routes must include providers from `PaymentMethodDataModule`
 * @see {@link PaymentMethodDataModule}
 *
 * @publicApi
 */
export const paymentProviderssRoutes: Routes = [
  { path: '', component: PaymentProvidersPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
