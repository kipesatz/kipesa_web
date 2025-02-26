import { TestBed } from '@angular/core/testing';

import { AuthUserDataService } from './auth-user-data.service';

describe('AuthUserDataService', () => {
  let service: AuthUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
