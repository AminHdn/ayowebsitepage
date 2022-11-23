import { TestBed } from '@angular/core/testing';

import { SignloginGuard } from './signlogin.guard';

describe('SignloginGuard', () => {
  let guard: SignloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
