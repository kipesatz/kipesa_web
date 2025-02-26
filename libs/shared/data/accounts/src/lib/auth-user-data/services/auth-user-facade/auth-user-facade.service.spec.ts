import { TestBed } from '@angular/core/testing';

import { AuthUserFacadeService } from './auth-user-facade.service';

describe('AuthUserFacadeService', () => {
  let service: AuthUserFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUserFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
