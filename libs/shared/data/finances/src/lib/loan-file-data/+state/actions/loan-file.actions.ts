import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { LoanFile } from '../models/loan-file.model';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Queryset } from '@kps/data/core';

export const loanFileActions = createActionGroup({
  source: 'LoanFile/API',
  events: {
    'Load LoanFiles': props<{ loanId: string; queryParams?: HttpParams }>(),
    'Load LoanFiles success': props<{
      queryset: Queryset<LoanFile>;
    }>(),
    'Load LoanFiles failure': props<{ error: HttpErrorResponse }>(),
    'Load LoanFile': props<{ loanId: string; fileId: string }>(),
    'Load LoanFile success': props<{ loanFile: LoanFile }>(),
    'Load LoanFile failure': props<{ error: HttpErrorResponse }>(),
    'Upload LoanFile': props<{ loanId: string; payload: FormData }>(),
    'Upload LoanFile success': props<{ loanFile: LoanFile }>(),
    'Upload LoanFile failure': props<{ error: HttpErrorResponse }>(),
    'Update LoanFile': props<{
      fileId: string;
      updates: FormData;
    }>(),
    'Update LoanFile success': props<{ updates: Update<LoanFile> }>(),
    'Update LoanFile failure': props<{ error: HttpErrorResponse }>(),
    'Delete LoanFile': props<{ fileId: string }>(),
    'Delete LoanFile Success': emptyProps(),
    'Delete LoanFile Failure': props<{ error: HttpErrorResponse }>(),
  },
});
