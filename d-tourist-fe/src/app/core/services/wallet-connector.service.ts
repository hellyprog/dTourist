import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class WalletConnectorService {
  provider: ethers.providers.Web3Provider;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  }

  async connectWallet(): Promise<string> {
    await this.provider.send('eth_requestAccounts', []);
    const signer = this.provider.getSigner();

    return signer.getAddress();
  }

  async isWalletConnected(): Promise<boolean> {
    const accounts = await this.provider.listAccounts();
    return accounts.length > 0;
  }

  subscribeToWalletEvent(eventName: string, callback: any) {
    window.ethereum.on('networkChanged', (networkId: any) => {
      console.log('networkChanged',networkId);
    });
  }

  unsubscribeFromWalletEvent(eventName: string, callback: any) {
    window.ethereum.on('networkChanged', (networkId: any) => {
      console.log('networkChanged',networkId);
    });
  }
}
