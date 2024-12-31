import { TestBed } from '@angular/core/testing';

import { KpsSnackBarService } from './kps-snack-bar.service';

describe('KpsSnackBarService', () => {
  let service: KpsSnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KpsSnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
