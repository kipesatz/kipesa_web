import { Component } from '@angular/core';
import {
  MatFormField,
  MatPrefix,
  MatSuffix,
} from '@angular/material/form-field';
import { BaseSearchFieldComponent } from './base-search-field.component';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'kps-search-field',
  imports: [
    MatFormField,
    MatIcon,
    MatPrefix,
    MatSuffix,
    MatInput,
    ReactiveFormsModule,
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent extends BaseSearchFieldComponent {}
