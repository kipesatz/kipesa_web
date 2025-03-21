import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Membership } from '../+state';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, inject } from '@angular/core';
import { MembershipDataService, MyMembershipDataService } from '../services';
import { pipe, switchMap } from 'rxjs';

export interface QuerySet<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}

export interface KipesaEntityState<T> {
  loading: boolean;
  error: HttpErrorResponse | string | null;
  queryset: QuerySet<T>;
}

export type MembershipState = KipesaEntityState<Membership>;

export const MembershipStore = signalStore(
  { providedIn: 'root' },
  withState<MembershipState>({
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
    memberships: computed(() => store.queryset.results()),
    total: computed(() => store.queryset.count() || 0),
    isLoading: computed(() => store.loading()),
    hasError: computed(() => !!store.error()),
    approvedMemberships: computed(() =>
      store.queryset
        .results()
        .filter((membership) => membership.status === 'APPROVED')
    ),
  })),
  withProps(() => ({
    _membershipApiService: inject(MembershipDataService),
    _myMembershipApiService: inject(MyMembershipDataService),
  })),
  withMethods(
    ({
      _membershipApiService: membershipApiService,
      _myMembershipApiService: myMembershipApiService,
      ...store
    }) => ({
      // load all memberships
      loadMemberships: rxMethod<HttpParams | undefined>(
        pipe(
          switchMap((queryParams) => {
            patchState(store, { error: null, loading: true });

            return membershipApiService.getMemberships(queryParams).pipe(
              tapResponse(
                (queryset: QuerySet<Membership>) => {
                  patchState(store, {
                    queryset,
                    loading: false,
                    error: null,
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
      loadMyMemberships: rxMethod<HttpParams | undefined>(
        pipe(
          switchMap((queryParams) => {
            patchState(store, { loading: true, error: null });

            return myMembershipApiService.getAll(queryParams).pipe(
              tapResponse(
                (queryset: QuerySet<Membership>) => {
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
    })
  )
);
