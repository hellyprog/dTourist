import { Injectable } from '@angular/core';
import { City, ExecutionResult } from '@core/models';
import { ethers } from 'ethers';
import CustomsAbi from '@assets/contracts/Customs.json';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class CustomsService {
  provider: ethers.providers.Web3Provider;
  wsProvider: ethers.providers.WebSocketProvider;
  customsContract: any = {
    address: '0xb62Be19F9C6F259d329FFA206b24c0D4CfDbc13C'
  }

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    this.wsProvider = new ethers.providers.WebSocketProvider('wss://rinkeby.infura.io/ws/v3/cbfccb482e9948de9fa068c1d2318700');
    console.log(this.provider)
    console.log(this.wsProvider);
    this.customsContract.abi = CustomsAbi.abi;
  }

  async crossBorder(fromCity: City, toCity: City) {
    const signer = this.provider.getSigner();
    var contract = new ethers.Contract(this.customsContract.address, this.customsContract.abi, signer);
    return contract['crossBorder'](fromCity.name, fromCity.country, toCity.name, toCity.country);
  }

  get contract() {
    const signer = this.wsProvider.getSigner();
    return new ethers.Contract(this.customsContract.address, this.customsContract.abi, signer);
  }
}
