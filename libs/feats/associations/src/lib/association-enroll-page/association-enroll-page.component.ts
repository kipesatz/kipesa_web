import { trigger, transition, style, animate } from '@angular/animations';
import { HttpParams } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import {
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatListItemMeta,
  MatListItemTitle,
} from '@angular/material/list';
import { CreateAssociationFormComponent } from '@kps/associations/forms';
import {
  Association,
  AssociationFacadeService,
  AssociationPayload,
  MembershipActions,
  MembershipFacadeService,
} from '@kps/data/associations';
import { InputFieldComponent } from '@kps/forms/fields';
import { ButtonComponent } from '@kps/material/button';
import { LoadingIndicatorComponent } from '@kps/material/progress';
import { debounceTime, map } from 'rxjs';
import { ConfirmAssocJoinReqDialogComponent } from '../components';
import { Actions, ofType } from '@ngrx/effects';

export const slideDownAnimation = trigger('slideDown', [
  transition(':enter', [
    style({ transform: 'translateY(-20px)', opacity: 0 }),
    animate(
      '200ms ease-out',
      style({ transform: 'translateY(0)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    animate(
      '200ms ease-in',
      style({ transform: 'translateY(-20px)', opacity: 0 })
    ),
  ]),
]);

@Component({
  selector: 'kps-association-join-request',
  templateUrl: './association-enroll-page.component.html',
  styleUrls: ['./association-enroll-page.component.scss'],
  animations: [slideDownAnimation],
  standalone: true,
  imports: [
    ButtonComponent,
    // list
    MatList,
    MatListItem,
    MatListItemTitle,
    MatListItemLine,
    MatListItemIcon,
    MatListItemMeta,

    // form
    InputFieldComponent,

    // other
    MatIcon,
    CreateAssociationFormComponent,
    LoadingIndicatorComponent,
  ],
})
export class AssociationEnrollPageComponent implements OnInit {
  constructor() {
    effect(() => {
      // fetch associations based on the search term
      if (this.searchTerm()) {
        this.assocFacade.dispatchLoadMany(
          new HttpParams({ fromObject: { q: this.searchTerm() as string } })
        );
      }
    });
  }

  private matDialog = inject(MatDialog);
  private actions$ = inject(Actions);
  private assocFacade = inject(AssociationFacadeService);
  private membershipFacade = inject(MembershipFacadeService);

  // data
  myMemberships = toSignal(
    this.actions$.pipe(
      ofType(MembershipActions.loadMyMembershipsSuccess),
      map(({ queryset }) => queryset.results)
    ),
    { initialValue: [] }
  );
  selectedOption = signal<'join' | 'create'>('join');
  searchControl = new FormControl('');
  readonly associations = this.assocFacade.associations;
  readonly assocLoading = this.assocFacade.loading;

  // get search term after each 300ms of inactivity after the last keyup
  searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(debounceTime(500)),
    { initialValue: null }
  );

  private myMembershipsFetched = toSignal(
    this.actions$.pipe(
      ofType(MembershipActions.loadMyMembershipsSuccess),
      map(() => true)
    )
  );

  alreadyMember = (assocId: string): boolean => {
    const shouldDisable = computed(() => {
      const _alreadyMember = this.myMemberships()
        .map((membership) => membership.association.id)
        .includes(assocId);
      return _alreadyMember;
    });

    return shouldDisable();
  };

  selectOption(option: 'join' | 'create') {
    this.selectedOption.set(option);
  }

  openJoinReqConfDialog(association: Association) {
    this.matDialog.open(ConfirmAssocJoinReqDialogComponent, {
      data: { association },
    });
  }

  createAssociation(payload: AssociationPayload) {
    this.assocFacade.dispatchCreateOne(payload);
  }

  ngOnInit(): void {
    this.membershipFacade.fetchMyMemberships();

    // done fetching myMmeberships
    if (this.myMembershipsFetched() && this.selectedOption() === 'join') {
      this.assocFacade.dispatchLoadMany(); // fetch associations
    }
  }
}
