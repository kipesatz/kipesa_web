import { Component, inject, input, model, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatNavList,
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatListItemMeta,
} from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconicButtonComponent } from '@kps/material/button';
import { SidenavFooterComponent } from '../sidenav-footer/sidenav-footer.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MenuItem } from '@kps/layout/core';
import { map } from 'rxjs';
import { AppSidenavService } from '../app-sidenav.service';

@Component({
  selector: 'kps-app-sidenav',
  imports: [
    // toolbar
    MatToolbar,
    // lists
    MatNavList,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatListItemMeta,
    // other
    RouterLink,
    RouterLinkActive,
    MatIcon,
    IconicButtonComponent,
    MatTooltip,
    SidenavFooterComponent,
  ],
  templateUrl: './app-sidenav.component.html',
  styleUrl: './app-sidenav.component.scss',
})
export class AppSidenavComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private appSidenavService = inject(AppSidenavService);

  sidenavRef = input.required<MatSidenav>();

  isExpanded = model(true);
  isSmallScreen = model(false);
  currentLevel = signal<MenuItem[]>(this.appSidenavService.getMenuItems());

  navigationStack = signal<MenuItem[][]>([]);
  submenuLabel: string | null = null;

  navigateToSubMenu(item: MenuItem) {
    if (item.children) {
      this.submenuLabel = item.label; // set submenuLabel
      this.navigationStack.update((stack) => [...stack, this.currentLevel()]);
      this.currentLevel.set(item.children);
    }
  }

  navigateBack() {
    const stack = this.navigationStack();
    if (stack.length) {
      const previousLevel = stack[stack.length - 1];
      this.currentLevel.set(previousLevel);
      this.navigationStack.update((stack) => stack.slice(0, -1));
    }
  }

  ngOnInit() {
    // observe window breakpoints
    this.breakpointObserver
      .observe([`(max-width: 768px)`])
      .pipe(map((result) => result.matches))
      .subscribe((matches) => {
        this.isSmallScreen.set(matches);
        this.isExpanded.set(!matches);
      });
  }
}
