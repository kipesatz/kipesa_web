import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParamsConfigOpts } from '../types';

/**
 * @description
 * Provides the ability to manipulate router state (currently queryParams) and it's tree-shakeable
 * where by, the default operations are performed in the root of the injection tree, but changing
 * according to where its injected.
 */
@Injectable({ providedIn: 'root' })
export class RouterService {
  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  /**
   * @description
   * Updates the current router state queryParams relative to the `ActivatedRoute`
   * @param queryParams Params
   * @publicApi
   */
  updateRouterState(queryParams?: Params): Promise<boolean> {
    return this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  /**
   * @description
   * Returns `Params` object from `ActivatedRoute` with ability to include and exclude some keys which provides the
   * flexbility to get only `queryParams` that you want.
   *
   * @usageNotes
   * Provide `keysToInclude` or `keysToExclude` but not both because they are mutually exclusive if you want some specific keys
   * The default behaviour will return all queryParams found in the activedRoute snapshot.
   *
   * @param options Partial<ParamsConfigOpts>
   * @returns Params
   * @publicApi
   */
  getQParams(options?: Partial<ParamsConfigOpts>): Params {
    const qParams = this.activatedRoute.snapshot.queryParams;
    let paramsToReturn: Params = {};

    if (options?.keysToExclude && options?.keysToInclude) {
      throw Error(
        'keysToInclude and keysToExclude are mutually exclusive. Specify either of them not both'
      );
    }

    // keysToInclude not undefined and has at least one item
    if (options?.keysToInclude && options.keysToInclude.length) {
      options.keysToInclude.forEach((qParamKey) => {
        const paramValue = qParams[qParamKey];
        // check if param value is not null or undefined
        if (paramValue !== undefined && paramValue !== null) {
          // include any key mentioned in keysToInclude only
          paramsToReturn[qParamKey] = paramValue;
        }
      });
    }

    // keysToExclude is not undefined and has at least one item
    else if (options?.keysToExclude && options.keysToExclude.length) {
      Object.keys(qParams).forEach((qParamKey) => {
        // if searchKey is not found in keysToExclude
        if (options.keysToExclude?.indexOf(qParamKey) === -1) {
          const paramValue = qParams[qParamKey];
          // check if param value is not null or undefined
          if (paramValue !== undefined && paramValue !== null) {
            // include that key to paramsToReturn
            paramsToReturn[qParamKey] = paramValue;
          }
        }
      });
    } else {
      paramsToReturn = qParams;
    }

    return paramsToReturn;
  }

  /**
   * @usseageNotes
   * Use this if you want queryParams to be returned in form of `HttpParams`
   * @returns HttpParams
   */
  getAsHttpParams(options?: Partial<ParamsConfigOpts>): HttpParams {
    return new HttpParams({ fromObject: this.getQParams(options) });
  }
}
