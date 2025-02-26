import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchValidator(
  controlName: string,
  matchingControlName: string,
  errorMsg?: string
) {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    console.log("executed matching validator")
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);
    let matchingError: MatchingError = { value: false, message: null };

    if (!control || !matchingControl) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors['matching']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      // set matching error with value of true and the supplied msg
      matchingError = { value: false, message: errorMsg ?? null };

      // set control errors
      matchingControl.setErrors({
        matching: matchingError,
      });

      // return erros
      return { matching: matchingError };
    } else {
      // matchingControl.setErrors(null);
      return null;
    }
  };
}

export interface MatchingError {
  value: boolean;
  message: string | null;
}
