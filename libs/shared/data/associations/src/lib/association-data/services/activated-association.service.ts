import { inject, Injectable } from '@angular/core';
import { StorageService } from '@kps/data/storage';
import { CURRENT_ASSOC_TOKEN, CurrentAssocTokenMap } from '../injection-tokens';
import { Association } from '../+state';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ActivatedAssociationService {
  private storageService = inject(StorageService<CurrentAssocTokenMap>);
  private curAssocToken = inject(CURRENT_ASSOC_TOKEN);
  private router = inject(Router);
  private matSnackBar = inject(MatSnackBar);

  // retrieve id
  getId(): string | null {
    return this.storageService.getItem(this.curAssocToken.idKey);
  }

  // retrieve name
  getName(): string | null {
    return this.storageService.getItem(this.curAssocToken.nameKey);
  }

  switchCurAssoc(newAssoc: Association): void {
    this.storageService.setItem(this.curAssocToken.idKey, newAssoc.id);
    this.storageService.setItem(this.curAssocToken.nameKey, newAssoc.name);
  }

  navigateToAssocDashboard(): void {
    const curAssocId: string | null = this.getId();
    if (curAssocId !== null) {
      this.router.navigate(['/associations', curAssocId, 'dashboard']);
    } else {
      this.matSnackBar.open(
        'You must select an association to view its dashboard'
      );
    }
  }

  notifySwitchedSuccessful(): void {
    if (this.getName()) {
      this.matSnackBar.open(`Successful switched to ${this.getName()}`);
    } else {
      this.matSnackBar.open('Failed to switch to another Association');
    }
  }
}
