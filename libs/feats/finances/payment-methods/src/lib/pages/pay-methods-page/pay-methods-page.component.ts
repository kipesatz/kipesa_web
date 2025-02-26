import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayMethodsTableComponent } from "../../components/pay-methods-table/pay-methods-table.component";

@Component({
  selector: 'kps-pay-methods-page',
  imports: [CommonModule, PayMethodsTableComponent],
  templateUrl: './pay-methods-page.component.html',
  styles: ``,
})
export class PayMethodsPageComponent {}
