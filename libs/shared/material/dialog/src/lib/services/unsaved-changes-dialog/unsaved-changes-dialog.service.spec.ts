import { TestBed } from '@angular/core/testing';

import { UnsavedChangesDialogService } from './unsaved-changes-dialog.service';

describe('UnsavedChangesDialogService', () => {
  let service: UnsavedChangesDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsavedChangesDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
