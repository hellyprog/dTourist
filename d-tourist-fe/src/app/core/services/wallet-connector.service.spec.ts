import { TestBed } from '@angular/core/testing';

import { WalletConnectorService } from './wallet-connector.service';

describe('WalletConnectorService', () => {
  let service: WalletConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
