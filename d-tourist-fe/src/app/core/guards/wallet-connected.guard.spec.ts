import { TestBed } from '@angular/core/testing';

import { WalletConnectedGuard } from './wallet-connected.guard';

describe('WalletConnectedGuard', () => {
  let guard: WalletConnectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WalletConnectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
