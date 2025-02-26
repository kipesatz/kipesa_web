import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export type ComparisonOperator =
  | 'greater'
  | 'less'
  | 'equal'
  | 'greaterEqual'
  | 'lessEqual';

export function comparisonValidator(
  controlPath: string,
  compareToPath: string,
  operator: ComparisonOperator
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const compareToControl = control.root.get(compareToPath);
    const controlToCompare = control.root.get(controlPath);

    if (!compareToControl || !controlToCompare) {
      return null;
    }

    const compareToValue = compareToControl.value;
    const controlValue = controlToCompare.value;

    if (!compareToValue || !controlValue) {
      return null;
    }

    switch (operator) {
      case 'greater':
        return controlValue > compareToValue
          ? null
          : { comparison: { operator, controlValue, compareToValue } };
      case 'less':
        return controlValue < compareToValue
          ? null
          : { comparison: { operator, controlValue, compareToValue } };
      case 'equal':
        return controlValue === compareToValue
          ? null
          : { comparison: { operator, controlValue, compareToValue } };
      case 'greaterEqual':
        return controlValue >= compareToValue
          ? null
          : { comparison: { operator, controlValue, compareToValue } };
      case 'lessEqual':
        return controlValue <= compareToValue
          ? null
          : { comparison: { operator, controlValue, compareToValue } };
      default:
        return null;
    }
  };
}
