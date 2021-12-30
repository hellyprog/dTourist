import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletConnectorService {

  constructor() { }

  getWalletAddress () {
    return '0x304204svvs923492fw3fefw';
  }
}
