import { Component, input } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import {
  FloatLabelType,
  MatFormFieldAppearance,
} from '@angular/material/form-field';

export function convertCamelCaseToTitleCase(camelCaseText: string): string {
  // Split the camelCase text into words
  const words = camelCaseText.split(/(?=[A-Z])/);

  // Capitalize the first letter of the first word and lowercase the rest
  const titleCaseWords = words.map((word, index) => {
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word.toLowerCase();
  });

  // Join the words back together with spaces
  return titleCaseWords.join(' ');
}

@Component({
  selector: 'kps-form-field',
  template: ``,
  styles: [],
})
export class FormFieldComponent {
  /** The label for this field, defaults to `controlName` */
  customLabel = input<string>();
  controlName = input.required<string>();
  /** Whether to hide required marker, defaults to true */
  hideRequired = input<boolean>();
  floatLabel = input<FloatLabelType>('auto');
  appearance = input<MatFormFieldAppearance>('outline');
  fieldPlaceholder = input<string>('');
  controller = input.required<FormControl | AbstractControl>();
  hideLabel = input<boolean>(false)

  /**Applies bottom margin, pass numbers from 1 to five as string or just as a number */
  marginBottom = input<string | number>('3');

  hasPrefix = input<boolean>(false);
  hasSuffix = input<boolean>(false);

  get fieldLabel(): string {
    if (this.customLabel()) {
      return this.customLabel() as string;
    }
    return convertCamelCaseToTitleCase(this.controlName());
  }

  get formControl(): FormControl {
    return this.controller() as FormControl;
  }

  get hideRequiredMarker(): boolean {
    if (this.hideRequired()) {
      return this.hideRequired() as boolean;
    }
    return this.controller().hasValidator(Validators.required);
  }
}
