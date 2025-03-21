import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivatedAssociationService,
  Membership,
  MembershipStorageService,
  MyMembershipDataService,
} from '@kps/data/associations';
import { AuthCheckService } from '@kps/data/auth';
import { Queryset } from '@kps/data/core';
import { SwitchAssociationDialogComponent } from '@kps/layout/association';
import { BaseDialogComponent, BaseDialogService } from '@kps/material/dialog';
import { KpsSnackBarService } from '@kps/material/snack-bar';
import { tapResponse } from '@ngrx/operators';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';

export interface KipesaEntityState<T> {
  loading: boolean;
  error: HttpErrorResponse | string | null;
  queryset: Queryset<T>;
}

export type MyMembershipState = KipesaEntityState<Membership>;

export const MyMembershipStore = signalStore(
  withState<MyMembershipState>({
    loading: false,
    error: null,
    queryset: {
      count: 0,
      next: '',
      previous: '',
      results: [],
    },
  }),
  withComputed((store) => ({
    hasError: computed(() => !!store.error()),
    approvedMemberships: computed(() => store.queryset.results()),
  })),
  withMethods((store, myMembershipApi = inject(MyMembershipDataService)) => ({
    loadMyMemberships: rxMethod<HttpParams | undefined>(
      pipe(
        switchMap((queryParams) => {
          patchState(store, { loading: true, error: null });

          return myMembershipApi.getAll(queryParams).pipe(
            tapResponse(
              (queryset: Queryset<Membership>) => {
                patchState(store, {
                  error: null,
                  queryset,
                  loading: false,
                });
              },
              (error: HttpErrorResponse | string) => {
                patchState(store, { error, loading: false });
              }
            )
          );
        })
      )
    ),
  })),
  withHooks(
    ({ hasError, approvedMemberships, loadMyMemberships, ...store }) => {
      const authCheck = inject(AuthCheckService);
      const snackBar = inject(KpsSnackBarService);
      const diagService = inject(BaseDialogService);
      const curAssoc = inject(ActivatedAssociationService);
      const memStorage = inject(MembershipStorageService);
      const router = inject(Router);

      // Add a flag to track if we've already loaded memberships
      let membershipsLoaded = false;

      // props
      const curAssocId = curAssoc.getId();

      return {
        onInit() {
          effect(() => {
            const state = getState(store);

            // check if is authenticated
            if (!authCheck.isAuthenticated()) {
              router.navigate(['/auth/login']);
              return;
            } else {
              // Only load memberships once
              if (!membershipsLoaded) {
                membershipsLoaded = true;
                // load cur user memberships
                loadMyMemberships(
                  new HttpParams({ fromObject: { status: 'APPROVED' } })
                );
              }

              // Only process results when loading is complete and we have no errors
              if (
                !state.loading &&
                !hasError() &&
                state.queryset.results.length > 0
              ) {
                const approvedMembershipIds = approvedMemberships().map(
                  (m) => m.association.id
                );

                // Only proceed if we have actual results to process
                if (approvedMembershipIds.length > 0) {
                  memStorage.storeActiveMembershipsIds(approvedMembershipIds);

                  if (curAssocId) {
                    const curMembershipIsApproved = memStorage
                      .getStoredActiveMembershipIds()
                      .includes(curAssocId);

                    if (
                      !curMembershipIsApproved &&
                      approvedMembershipIds.length >= 1
                    ) {
                      // curMembership is not approved, but has at least one other approved membership
                      // notify and open a dialog to choose a workspace
                      diagService.openDefault(SwitchAssociationDialogComponent);
                      snackBar.openSnackBar({
                        data: 'Your current membership is inactive, please choose another workspace',
                      });
                    } else if (!curMembershipIsApproved) {
                      // notify the user and redirect to his account
                      router.navigate(['/myAccount/dashboard']);
                      snackBar.openSnackBar({
                        data: "You don't have any active membership, redirecting to your account",
                      });
                    }
                  } else {
                    // if not curAssocId and has more than one approved membership
                    console.log('no active workspace is opened');
                    if (approvedMembershipIds.length >= 1) {
                      console.log('has more than one approved membership');
                      diagService.openDefault(SwitchAssociationDialogComponent);
                    } else {
                      router.navigateByUrl('/myAccount/dashboard');
                    }
                  }
                }
              }
            }
          });
        },
      };
    }
  )
);
