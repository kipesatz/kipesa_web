import { Component, input, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'kps-vertical-tab',
  imports: [],
  templateUrl: './vertical-tab.component.html',
  styleUrl: './vertical-tab.component.scss',
})
export class VerticalTabComponent {
  id = input.required<string>();
  label = input.required<string>();
  icon = input<string>();
  badge = input<string | number>();
  isSecondary = input<boolean>(false);
  contentTemplate = viewChild.required<TemplateRef<unknown>>('contentTemplate');

  isActive = false;
}
