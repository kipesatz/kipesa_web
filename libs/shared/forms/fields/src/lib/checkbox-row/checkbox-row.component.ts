import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'kps-checkbox-row',
  imports: [ReactiveFormsModule, MatCheckbox],
  templateUrl: './checkbox-row.component.html',
  styleUrl: './checkbox-row.component.scss',
})
export class CheckboxRowComponent {
  controller = input.required<FormControl>();
  labelPosition = input<'before' | 'after'>('before');
}
