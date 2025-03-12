import { Component, input } from '@angular/core';

@Component({
  selector: 'kps-step-header',
  imports: [],
  templateUrl: './step-header.component.html',
  styleUrl: './step-header.component.scss',
})
export class StepHeaderComponent {
  label = input<string>('');
  index = input<number>(0);
  active = input<boolean>(false);
  completed = input<boolean>(false);
}
