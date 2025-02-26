import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UpdateAuthUserEffects } from './update-auth-user.effects';

describe('UpdateAuthUserEffects', () => {
  let actions$: Observable<any>;
  let effects: UpdateAuthUserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateAuthUserEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(UpdateAuthUserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
