import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { WalletConnectorService } from './wallet-connector.service';
import { ethers } from 'ethers';
import InsuranceStore from '@assets/contracts/InsuranceStore.json';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  provider: ethers.providers.Web3Provider;
  wsProvider: ethers.providers.WebSocketProvider;
  insuranceStoreContract: any = {};

  constructor(
    private walletConnectorService: WalletConnectorService,
    private appConfigService: AppConfigService) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      this.wsProvider = new ethers.providers.WebSocketProvider(this.appConfigService.wsProvider);
      this.insuranceStoreContract.address = this.appConfigService.insuranceStoreContractAddress;
      this.insuranceStoreContract.abi = InsuranceStore.abi;
  }

  async buyInsurance(days: number, insuranceType: number, totalPrice: number) {
    const correctNetworkConnected = await this.walletConnectorService.ensureCorrectNetworkConnected();

    if (correctNetworkConnected) {
      const signer = this.provider.getSigner();
      const contract = new ethers.Contract(this.insuranceStoreContract.address, this.insuranceStoreContract.abi, signer);
      const options = { value: ethers.utils.parseEther(totalPrice.toString()) };
      return contract['buyInsurance'](days, insuranceType, options);
    }
  }

  async getContractOwnerAddress() {
    const correctNetworkConnected = await this.walletConnectorService.ensureCorrectNetworkConnected();

    if (correctNetworkConnected) {
      const signer = this.provider.getSigner();
      const contract = new ethers.Contract(this.insuranceStoreContract.address, this.insuranceStoreContract.abi, signer);
      return contract['owner']();
    }
  }

  async isContractOwner() {
    const correctNetworkConnected = await this.walletConnectorService.ensureCorrectNetworkConnected();

    if (correctNetworkConnected) {
      const signer = this.provider.getSigner();
      const contract = new ethers.Contract(this.insuranceStoreContract.address, this.insuranceStoreContract.abi, signer);
      const ownerAddress = contract['owner']();
      const currentAddress = await this.walletConnectorService.getWalletAddress();

      return ownerAddress === currentAddress;
    }

    return false;
  }

  async getInsurancePrice(insuranceType: number) {
    const correctNetworkConnected = await this.walletConnectorService.ensureCorrectNetworkConnected();

    if (correctNetworkConnected) {
      const signer = this.provider.getSigner();
      const contract = new ethers.Contract(this.insuranceStoreContract.address, this.insuranceStoreContract.abi, signer);
      return contract['getInsurancePrice'](insuranceType);
    }
  }

  async getInsuranceInfo(address?: string) {
    address ??= await this.walletConnectorService.getWalletAddress();
    const correctNetworkConnected = await this.walletConnectorService.ensureCorrectNetworkConnected();

    if (correctNetworkConnected) {
      const signer = this.provider.getSigner();
      const contract = new ethers.Contract(this.insuranceStoreContract.address, this.insuranceStoreContract.abi, signer);
      return contract['getInsuranceInfo'](address);
    }
  }

  subscribeToContractEvent(eventName: string, callback: any) {
    const signer = this.wsProvider.getSigner();
    const contract = new ethers.Contract(this.insuranceStoreContract.address, this.insuranceStoreContract.abi, signer);
    contract.on(eventName, callback);
  }

  unsubscribeFromContractEvent(eventName: string, callback: any) {
    const signer = this.wsProvider.getSigner();
    const contract = new ethers.Contract(this.insuranceStoreContract.address, this.insuranceStoreContract.abi, signer);
    contract.off(eventName, callback);
  }
}
