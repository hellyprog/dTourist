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
  customsContract: any = {
    address: '0xEB687668c9F7Ff413873deb39B6E9B5Ede0dfF70'
  }

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    this.customsContract.abi = CustomsAbi.abi;
  }

  async crossBorder(fromCity: City, toCity: City) {
    const signer = this.provider.getSigner();
    var contract = new ethers.Contract(this.customsContract.address, this.customsContract.abi, signer);
    await contract['crossBorder'](fromCity.name, fromCity.country, toCity.name, toCity.country);
    
    return new ExecutionResult();
  }
}
