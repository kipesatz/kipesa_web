import { Component, input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'kps-stat-card',
  imports: [MatCard, MatCardContent, MatIcon],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  icon = input.required<string>();
  colorClass = input<string | undefined>(undefined)
  label = input.required<string>();
  value = input.required<unknown>();
}
