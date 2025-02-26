import { Component, HostListener, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { IconicButtonComponent } from '@kps/material/button';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'kps-auth-container',
  imports: [MatToolbar, RouterOutlet, IconicButtonComponent],
  standalone: true,
  templateUrl: './auth-container.component.html',
  styleUrl: './auth-container.component.scss',
})
export class AuthContainerComponent {
  public router: Router = inject(Router);

  isScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }
}
