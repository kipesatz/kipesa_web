import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AssocSettingsRouterService } from '@kps/core/router';

@Component({
  selector: 'kps-sidenav-footer',
  imports: [MatIcon, MatIconButton],
  templateUrl: './sidenav-footer.component.html',
  styleUrl: './sidenav-footer.component.scss',
})
export class SidenavFooterComponent {
  private router = inject(Router);
  private assocSettingsRouter = inject(AssocSettingsRouterService);

  openAssocSettings(): void {
    this.assocSettingsRouter.storeCurrentRouteBeforeSettings().then(() => {
      this.router.navigate(['/assocSettings'], { skipLocationChange: true });
    });
  }
}
