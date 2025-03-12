import {
  Component,
  computed,
  effect,
  forwardRef,
  input,
  model,
  OnInit,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import {
  MatError,
  MatFormField,
  MatFormFieldAppearance,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'kps-autocomplete-field',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatIconButton,
    MatError,
    MatOption,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatSuffix,
  ],
  templateUrl: './autocomplete-field.component.html',
  styleUrl: './autocomplete-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteFieldComponent),
      multi: true,
    },
  ],
})
export class AutocompleteFieldComponent
  implements OnInit, ControlValueAccessor
{
  options = input<any[]>([]);
  displayWith = input<((value: any) => string) | null>(null);
  placeholder = input<string>('Search...');
  label = input<string | undefined>(undefined);
  searchDelay = input<number>(300);
  appearance = input<MatFormFieldAppearance>('outline');
  customClass = input<string>('');
  errorMessage = input<string>('This field is required');
  minLength = input<number>(0);
  filterFunction = input<(value: string, option: any) => boolean>(
    this.defaultFilterFunction
  );

  selectedOption = model<unknown>();
  searchTerm = model<string>('');

  controller = input<FormControl>(new FormControl(''));
  private controllerStreamedValue = toSignal<string | unknown>(
    this.controller().valueChanges.pipe(
      debounceTime(this.searchDelay()),
      distinctUntilChanged()
    )
  );

  filteredOptions = computed(() =>
    this._filter(this.controllerStreamedValue())
  );

  // private onChange: any = () => {
  //   //
  // };
  // private onTouched: any = () => {};

  constructor() {
    // this.filteredOptions = this.controller().valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value || ''))
    // );
    effect(() => {
      if (this.controllerStreamedValue()) {
        if (typeof this.controllerStreamedValue() === 'string') {
          this.searchTerm.set(this.controllerStreamedValue() as string);
        } else {
          this.selectedOption.set(this.controllerStreamedValue());
        }
      }
    });
  }

  ngOnInit(): void {
    this.controller()
      .valueChanges.pipe(
        debounceTime(this.searchDelay()),
        distinctUntilChanged(),
        tap((value) => {
          if (typeof value === 'string') {
            this.searchTerm.set(value);
          } else {
            this.selectedOption.set(value);
          }
        })
      )
      .subscribe();
  }

  defaultFilterFunction(value: string, option: any): boolean {
    const _displayFn = this.displayWith();
    if (typeof option === 'string') {
      return option.toLowerCase().includes(value.toLowerCase());
    } else if (_displayFn && option) {
      return _displayFn(option).toLowerCase().includes(value.toLowerCase());
    }
    return false;
  }

  private _filter(value: string | unknown): unknown[] {
    if (!value) return this.options();

    const displayFn = this.displayWith();

    const filterValue =
      typeof value === 'string'
        ? value.toLowerCase()
        : displayFn
        ? displayFn(value).toLowerCase()
        : '';

    return this.options().filter((option) =>
      this.filterFunction()(filterValue, option)
    );
  }

  displayFn(option: any): string {
    const displayFn = this.displayWith();
    if (!option) return '';
    return displayFn ? displayFn(option) : option.toString();
  }

  // ControlValueAccessor interface methods
  writeValue(value: any): void {
    this.controller().setValue(value);
  }

  registerOnChange(fn: any): void {
    // this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // this.onTouched = fn;
  }

  onBlur(): void {
    // this.onTouched();
  }

  clear(): void {
    this.controller().setValue('');
    // this.onChange('');
  }
}
