import { Component } from '@angular/core';
import { LoansTableComponent } from '../../components';

@Component({
  selector: 'kps-loans-pg',
  imports: [LoansTableComponent],
  templateUrl: './loans-page.component.html',
  styleUrl: './loans-page.component.scss',
})
export class LoansPageComponent {}
