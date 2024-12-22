import { FormGroup, FormControl } from '@angular/forms';

export abstract class BaseFormService<T> {
  protected abstract buildForm(): FormGroup<{
    [K in keyof T]: FormControl<T[K]>;
  }>;

  /**Perform initialization process of the form */
  public abstract initForm(): void;
}
