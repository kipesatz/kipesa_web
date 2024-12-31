import { Component, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'kps-snack-bar',
  templateUrl: './snack-bar.component.html',
  styles: [''],
  standalone: true,
})
export class SnackBarComponent {
  public snackBarData: unknown = inject(MAT_SNACK_BAR_DATA);
}
