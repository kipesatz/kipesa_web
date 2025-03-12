import { Component, input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'kps-loan-status-badge',
  imports: [NgClass],
  templateUrl: './loan-status-badge.component.html',
  styleUrl: './loan-status-badge.component.scss',
})
export class LoanStatusBadgeComponent implements OnInit {
  status = input<string>('');

  public displayText = '';
  public badgeClass = '';

  ngOnInit(): void {
    this.formatStatusBadge();
  }

  private formatStatusBadge(): void {
    // Convert status to lowercase and remove spaces for consistent processing
    const normalizedStatus = this.status().toLowerCase().trim();

    switch (normalizedStatus) {
      case 'applied':
        this.displayText = 'Applied';
        this.badgeClass = 'badge-submitted'; // Yellow
        break;
      case 'underreview':
        this.displayText = 'Under Review';
        this.badgeClass = 'badge-started'; // Purple
        break;
      case 'approved':
        this.displayText = 'Approved';
        this.badgeClass = 'badge-approved'; // Teal
        break;
      case 'rejected':
        this.displayText = 'Rejected';
        this.badgeClass = 'badge-denied'; // Pink
        break;
      case 'disbursed':
        this.displayText = 'Disbursed';
        this.badgeClass = 'badge-funded'; // Turquoise
        break;
      case 'active':
        this.displayText = 'Active';
        this.badgeClass = 'badge-agreed'; // Light blue
        break;
      case 'completed':
        this.displayText = 'Completed';
        this.badgeClass = 'badge-loan-received'; // Gray blue
        break;
      case 'writtenoff':
        this.displayText = 'Written Off';
        this.badgeClass = 'badge-suspended'; // Orange
        break;
      default:
        this.displayText = this.status();
        this.badgeClass = 'badge-default'; // Default style
    }
  }
}
