import { MatOption } from '@angular/material/core';
import {
  Component,
  input,
  model,
  computed,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { FormFieldComponent } from '../form-field/form-field.component';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldErrorComponent } from '../field-error/field-error.component';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'kps-select-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatError,
    MatHint,
    MatPrefix,
    MatSuffix,
    MatOption,
    FieldErrorComponent,
  ],
  templateUrl: './select-field.component.html',
  styles: [],
})
export class SelectFieldComponent extends FormFieldComponent {
  selectedOption = model<unknown>();
  multiSelection = input(false, {
    transform: (value: boolean | 'true' | 'false' | undefined) =>
      typeof value === 'boolean'
        ? value
        : value === 'true',
  });

  @ContentChildren(MatOption) private options: QueryList<MatOption> | undefined;

  selectionOptions = computed(() => {
    const _optsList: MatOption[] = [];
    if (this.options && this.options.length > 0) {
      this.options.forEach((option) => _optsList.push(option));
    }

    return _optsList;
  });
}
