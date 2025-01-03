import { Component, output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

export interface FormProgress {
  progress: number;
  valid: boolean;
}

@Component({
  selector: 'kps-base-form',
  imports: [],
  template: ``,
  styles: ``,
})
export abstract class BaseFormComponent {
  abstract getFormGroup(): FormGroup;

  formProgressChange = output<FormProgress>();

  getController(controlName: string, ...parents: string[]) {
    if (parents && parents.length > 0) {
      const pathToControl = parents;
      pathToControl.push(controlName);

      return this.getFormGroup().get(pathToControl) as FormControl;
    }
    return this.getFormGroup().get(controlName) as FormControl;
  }

  /**
   * @description Retrieves values from a form and append them to the FormData.
   * @returns FormData
   * @publicApi
   */
  protected getFormData(): FormData {
    const formData = new FormData();
    const formControls = Object.keys(this.getFormGroup().controls);

    formControls.forEach((controlName) => {
      const controlValue = this.getController(controlName).value;
      if (controlValue !== undefined && controlValue !== null) {
        formData.append(controlName, controlValue);
      }
    });

    return formData;
  }

  public calculateFormProgress(): { progress: number; valid: boolean } {
    const form = this.getFormGroup();
    const controls = Object.values(form.controls);
    const totalFields = controls.length;
    const filledFields = controls.filter(
      (control) =>
        control.value !== null && control.value !== '' && !control.pristine
    ).length;

    return {
      progress: (filledFields / totalFields) * 100,
      valid: form.valid,
    };
  }
}
