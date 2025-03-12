import { Component } from '@angular/core';
import { BaseButtonComponent } from '../base-button/base-button.component';
import { LoadingIndicatorComponent } from '@kps/material/progress';

@Component({
  selector: 'kps-fantasy-button',
  imports: [LoadingIndicatorComponent],
  templateUrl: './fantasy-button.component.html',
  styleUrl: './fantasy-button.component.scss',
})
export class FantasyButtonComponent extends BaseButtonComponent {}
