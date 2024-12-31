import { Component, input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'kps-loading-indicator',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss',
})
export class LoadingIndicatorComponent {
  spinnerColor = input<ThemePalette>('warn');
}
