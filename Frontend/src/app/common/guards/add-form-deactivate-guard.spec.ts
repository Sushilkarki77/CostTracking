import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { addFormDeactivateGuard } from './add-form-deactivate-guard';

describe('addFormDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => addFormDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
