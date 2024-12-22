import {
  Component,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kps-field-error',
  standalone: true,
  imports: [],
  templateUrl: './field-error.component.html',
  styles: ``,
})
export class FieldErrorComponent implements OnInit, OnChanges {
  controller = input.required<FormControl>();
  fieldLabel = input.required<string>();

  minError: string | null = null;
  maxError: string | null = null;
  minLengthError: string | null = null;
  maxLengthError: string | null = null;
  requiredError: string | null = null;

  ngOnInit(): void {
    this.checkFieldErrors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['controller']) {
      this.checkFieldErrors();
    }
  }

  checkFieldErrors(): void {
    if (this.controller().errors !== null) {
      // requiredError
      if (this.checkError('required')) {
        this.requiredError = `${this.fieldLabel()} is important`;
      }

      // minLengthError
      if (this.checkError('minlength')) {
        const error = this.getError('minlength');
        this.minLengthError = `
          ${this.fieldLabel()} should contain at least ${error['requiredLength']} characters.`;
      }

      // maxLengthError
      if (this.checkError('maxlength')) {
        const error = this.getError('maxlength');
        this.maxLengthError = `
          ${this.fieldLabel()} should not be more than ${error['requiredLength']} characters.`;
      }

      // maxError
      if (this.checkError('max')) {
        const error = this.getError('max');
        this.maxError = `${this.fieldLabel()} should not exceed ${error['max']}.`;
      }

      // minError
      if (this.checkError('min')) {
        const error = this.getError('min');
        this.minError = `${this.fieldLabel()} should not be less than ${error['min']}.`;
      }
    }
  }

  private getError(errorCode: string) {
    if (this.controller().errors !== null) {
      return this.controller().getError(errorCode);
    }
    return null;
  }

  private checkError(errorCode: string): boolean {
    return this.controller().hasError(errorCode);
  }
}
