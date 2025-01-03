import { Component, inject, model, OnDestroy, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatError,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kps-phone-field',
  imports: [
    MatFormField,
    MatError,
    MatInput,
    MatSelect,
    MatOption,
    MatLabel,
    MatIcon,
    MatSuffix,
    ReactiveFormsModule,
  ],
  templateUrl: './phone-field.component.html',
  styleUrl: './phone-field.component.scss',
})
export class PhoneFieldComponent implements OnInit, OnDestroy {
  private builder = inject(NonNullableFormBuilder);
  private subscriptions = new Subscription();

  /**
   * Parses the phone string in the format of `+1234567890` into a country code and phone number
   */
  private parsePhoneString(
    phoneString: string | null
  ): { countryCode: string; phoneNumber: string } | null {
    if (!phoneString) return null;

    const match = phoneString.match(/^(\+\d{1,3})([\d]{9,10})$/);
    if (!match) return null;

    const [countryCode, phoneNumber] = match;
    return { countryCode, phoneNumber };
  }

  /**
   * Sets the phone string in the form
   */
  setPhoneString(phoneString: string | null) {
    const parsed = this.parsePhoneString(phoneString);
    if (parsed) {
      this.phoneForm.patchValue(parsed);
    }
  }

  /**
   * Returns the phone string in the format of `+1234567890`
   */
  getPhoneString(): string {
    const { countryCode, phoneNumber } = this.phoneForm.value;
    if (!countryCode || !phoneNumber) return '';
    return `${countryCode}${phoneNumber}`;
  }

  phoneString = model<string | null>();

  phoneForm = this.builder.group({
    countryCode: ['+1', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{9,10}$/)]],
  });

  ngOnInit(): void {
    this.phoneString.set(this.getPhoneString());

    this.subscriptions.add(
      this.phoneForm.valueChanges.subscribe(() => {
        this.phoneString.set(this.getPhoneString());
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
