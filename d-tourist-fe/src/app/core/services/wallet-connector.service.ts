import { Injectable } from '@angular/core';
import { ethers } from "ethers";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class WalletConnectorService {

  constructor() { }

  async getWalletAddress () {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    );
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    return signer.getAddress();
  }
}
