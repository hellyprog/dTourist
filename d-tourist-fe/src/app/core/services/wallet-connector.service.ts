import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ethers } from 'ethers';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class WalletConnectorService {
  provider: ethers.providers.Web3Provider;
  RINKEBY_NETWORK_ID = 4;

  constructor(private snackBar: MatSnackBar) {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  }

  async connectWallet(): Promise<string> {
    await this.provider.send('eth_requestAccounts', []);
    const signer = this.provider.getSigner();

    return signer.getAddress();
  }

  async getWalletAddress(): Promise<string> {
    const signer = this.provider.getSigner();

    return signer.getAddress();
  }

  async isWalletConnected(): Promise<boolean> {
    const accounts = await this.provider.listAccounts();
    return accounts.length > 0;
  }

  async isCorrectNetworkConnected(): Promise<boolean> {
    const { chainId } = await this.provider.getNetwork();
    return chainId === this.RINKEBY_NETWORK_ID;
  }

  async ensureCorrectNetworkConnected(): Promise<boolean> {
    const { chainId } = await this.provider.getNetwork();

    if (Number(chainId) !== this.RINKEBY_NETWORK_ID) {
      const snackBarText = 'Selected network is incorrect. Please switch to Rinkeby network.';
      this.snackBar.open(snackBarText, 'Close', {
        duration: 4000,
        panelClass: ['snackbar-dark']
      });

      return false;
    }

    return true;
  }

  subscribeToWalletEvent(eventName: string, callback: any) {
    window.ethereum.on(eventName, callback);
  }

  unsubscribeFromWalletEvent(eventName: string, callback: any) {
    window.ethereum.removeListener(eventName, callback);
  }
}
