import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BaseSearchFieldComponent } from '../search-field/base-search-field.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'kps-animated-search-field',
  imports: [MatIcon, MatIconButton, ReactiveFormsModule],
  templateUrl: './animated-search-field.component.html',
  styleUrl: './animated-search-field.component.scss',
})
export class AnimatedSearchFieldComponent extends BaseSearchFieldComponent {}
