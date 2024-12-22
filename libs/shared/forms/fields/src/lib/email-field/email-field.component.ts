import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'kps-email-field',
  standalone: true,
  imports: [InputFieldComponent, MatIcon, MatPrefix],
  templateUrl: './email-field.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailFieldComponent extends InputFieldComponent {}
