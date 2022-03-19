import { Injectable } from '@angular/core';
import { City, ExecutionResult } from '@core/models';
import { ethers } from 'ethers';
import CustomsAbi from '@assets/contracts/Customs.json';
import { WalletConnectorService } from './wallet-connector.service';
import { AppConfigService } from './app-config.service';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class CustomsService {
  provider: ethers.providers.Web3Provider;
  wsProvider: ethers.providers.WebSocketProvider;
  customsContract: any = {};

  constructor(
    private walletConnectorService: WalletConnectorService,
    private appConfigService: AppConfigService) {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    this.wsProvider = new ethers.providers.WebSocketProvider(this.appConfigService.contract.wsProvider);
    this.customsContract.address = this.appConfigService.contract.customsContractAddress;
    this.customsContract.abi = CustomsAbi.abi;
  }

  async crossBorder(fromCity: City, toCity: City) {
    const correctNetworkConnected = await this.walletConnectorService.ensureCorrectNetworkConnected();

    if (correctNetworkConnected) {
      const signer = this.provider.getSigner();
      const contract = new ethers.Contract(this.customsContract.address, this.customsContract.abi, signer);
      return contract['crossBorder'](fromCity.name, fromCity.country, toCity.name, toCity.country);
    }
  }

  subscribeToContractEvent(eventName: string, callback: any) {
    const signer = this.wsProvider.getSigner();
    const contract = new ethers.Contract(this.customsContract.address, this.customsContract.abi, signer);
    contract.on(eventName, callback);
  }

  unsubscribeFromContractEvent(eventName: string, callback: any) {
    const signer = this.wsProvider.getSigner();
    const contract = new ethers.Contract(this.customsContract.address, this.customsContract.abi, signer);
    contract.off(eventName, callback);
  }
}
