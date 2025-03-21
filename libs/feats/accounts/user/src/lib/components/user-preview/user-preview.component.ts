import { Component, model } from '@angular/core';
import { User } from '@kps/data/accounts';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'kps-user-preview',
  imports: [MatIcon],
  templateUrl: './user-preview.component.html',
  styleUrl: './user-preview.component.scss',
})
export class UserPreviewComponent {
  user = model.required<User>();
}
