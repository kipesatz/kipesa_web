import { Component, computed, inject, input, output } from '@angular/core';
import {
  ActivatedAssociationService,
  Association,
} from '@kps/data/associations';
import { MatTooltip } from '@angular/material/tooltip';
import { BaseDialogService } from '@kps/material/dialog';
import { ConfirmSwitchAssocDialogComponent } from '../confirm-switch-assoc-dialog/confirm-switch-assoc-dialog.component';

@Component({
  selector: 'kps-assoc-sidenav-button',
  imports: [MatTooltip],
  templateUrl: './assoc-sidenav-button.component.html',
  styleUrl: './assoc-sidenav-button.component.scss',
})
export class AssocSidenavButtonComponent {
  private curAssoc = inject(ActivatedAssociationService);
  private diagService = inject(BaseDialogService);

  association = input.required<Association>();

  tenantSelected = output<Association>();

  isActive = computed(() => this.curAssoc.getId() === this.association().id);
  hasLogo = computed(() => this.association() && this.association().logo);

  get assocNameInitials(): string {
    return this.association().name.substring(0, 2).toUpperCase();
  }

  selectTenant(): void {
    this.tenantSelected.emit(this.association());
    this.diagService.openDefault(ConfirmSwitchAssocDialogComponent, {
      minWidth: '500px',
      data: {
        association: this.association(),
      },
    });
  }
}
