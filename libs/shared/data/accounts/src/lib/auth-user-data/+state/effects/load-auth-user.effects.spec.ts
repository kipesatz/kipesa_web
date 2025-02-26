import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoadAuthUserEffects } from './load-auth-user.effects';

describe('LoadAuthUserEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadAuthUserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadAuthUserEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(LoadAuthUserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
