import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentProvidersTableComponent } from "../../components/payment-providers-table/payment-providers-table.component";

@Component({
  selector: 'kps-payment-providers-page',
  imports: [CommonModule, PaymentProvidersTableComponent],
  templateUrl: './payment-providers-page.component.html',
  styles: ``,
})
export class PaymentProvidersPageComponent {}
