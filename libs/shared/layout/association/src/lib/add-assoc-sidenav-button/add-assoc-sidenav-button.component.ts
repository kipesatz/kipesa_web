import { Component, EventEmitter, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'kps-add-assoc-sidenav-button',
  imports: [MatTooltip, MatIcon],
  templateUrl: './add-assoc-sidenav-button.component.html',
  styleUrl: './add-assoc-sidenav-button.component.scss',
})
export class AddAssocSidenavButtonComponent {
  tooltipText = input<string>('Join an Association');
  addClicked = new EventEmitter<void>();
}
