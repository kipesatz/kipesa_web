import { inject, Injectable } from '@angular/core';
import { fromTransaction, transactionActions } from '../+state';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class TransactionFacadeService {
  private store = inject(Store);

  readonly transactions = this.store.selectSignal(fromTransaction.selectAll);
  readonly loading = this.store.selectSignal(fromTransaction.selectLoading);
  readonly transactionsCount = this.store.selectSignal(
    fromTransaction.selectCount
  );
  readonly totalTransactions = this.store.selectSignal(
    fromTransaction.selectTotal
  );

  fetchAll(queryParams?: HttpParams) {
    this.store.dispatch(transactionActions.loadTransactions({ queryParams }));
  }

  deleteTransaction(id: string) {
    this.store.dispatch(transactionActions.deleteTransaction({ id }));
  }
}
