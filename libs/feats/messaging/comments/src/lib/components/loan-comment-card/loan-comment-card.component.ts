import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { User } from '@kps/data/accounts';
import { UserPreviewService } from '@kps/accounts/user';

export interface LoanComment {
  id: string;
  loan: string;
  content: string;
  timestamp: string;
  member: {
    user: User;
  };
}

@Component({
  selector: 'kps-loan-comment-card',
  imports: [],
  templateUrl: './loan-comment-card.component.html',
  styleUrl: './loan-comment-card.component.scss',
})
export class LoanCommentCardComponent {
  loanComment = input.required<LoanComment>();
  userAvatar = viewChild.required<ElementRef<HTMLDivElement>>('userAvatar');

  private userPreviewService = inject(UserPreviewService);

  hasProfilePhoto(): boolean {
    return !!this.loanComment().member.user.profilePhoto;
  }

  showUserPreview(event: MouseEvent): void {
    const target = this.userAvatar().nativeElement;
    const rect = target.getBoundingClientRect();

    this.userPreviewService.showUserPreview({
      user: this.loanComment().member.user,
      x: rect.left,
      y: rect.bottom,
    });

    event.stopPropagation();
  }

  getHumanizedTimestamp(timestamp: string | Date): string {
    if (!timestamp) return '';

    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString();
  }
}
