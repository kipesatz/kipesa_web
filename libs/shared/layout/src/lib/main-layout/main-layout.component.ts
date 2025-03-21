import { trigger, transition, style, animate } from '@angular/animations';
import { Component, inject, signal } from '@angular/core';

import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { AuthCheckService } from '@kps/data/auth';
import { ActivatedAssociationService } from '@kps/data/associations';
import { AppBarComponent } from '../app-bar/app-bar.component';
import { AppSidenavComponent } from '../app-sidenav/app-sidenav.component';
import { InnerSidenavContainerComponent } from '../inner-sidenav-container/inner-sidenav-container.component';

@Component({
  selector: 'kps-main-layout',
  imports: [
    // sidenav
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    AppBarComponent,
    AppSidenavComponent,
    InnerSidenavContainerComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class MainLayoutComponent {
  authCheck = inject(AuthCheckService);
  activatedAssocService = inject(ActivatedAssociationService);

  startSidenavExpanded = signal(true);
  isSmallScreen = signal(false);
}
