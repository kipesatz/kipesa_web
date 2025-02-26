import { FormGroup, FormControl } from '@angular/forms';

export abstract class BaseFormService<T> {
  abstract buildForm(): FormGroup<{
    [K in keyof T]: FormControl<T[K]>;
  }>;
}
