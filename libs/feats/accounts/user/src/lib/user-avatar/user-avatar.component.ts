import { Component, input } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { User } from '@kps/data/accounts';

@Component({
  selector: 'kps-user-avatar',
  imports: [NgClass, NgOptimizedImage],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
})
export class UserAvatarComponent {
  user =
    input.required<
      Pick<
        User,
        | 'firstName'
        | 'lastName'
        | 'fullName'
        | 'initials'
        | 'email'
        | 'profilePhoto'
      >
    >();
  orientation = input<'hr' | 'vr'>('hr'); // horizontal or vertical
  zoom = input<number>(1); // default zoom factor

  get userShortName(): string {
    return `${this.user().firstName} ${this.user().lastName}`.trim();
  }

  get avatarSize(): number {
    return 40 * this.zoom(); // Base size multiplied by zoom factor
  }

  get fontSize(): number {
    return 14 * this.zoom(); // Base font size multiplied by zoom factor
  }

  get initialsSize(): number {
    return 16 * this.zoom(); // Base initials font size multiplied by zoom factor
  }

  get containerClass(): string {
    return this.orientation() === 'hr' ? 'hr-container' : 'vr-container';
  }
}
