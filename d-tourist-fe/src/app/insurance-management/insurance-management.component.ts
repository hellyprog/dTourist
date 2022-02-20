import { Component, OnInit } from '@angular/core';
import { AppConfigService, InsuranceService } from '@core/services';
import { ethers } from 'ethers';

@Component({
  selector: 'app-insurance-management',
  templateUrl: './insurance-management.component.html',
  styleUrls: ['./insurance-management.component.scss']
})
export class InsuranceManagementComponent implements OnInit {
  contractBalance!: number;
  contractAddress: string;

  constructor(
    private appConfigService: AppConfigService,
    private insuranceService: InsuranceService
  ) {
    this.contractAddress = this.appConfigService.insuranceStoreContractAddress;
  }

  async ngOnInit() {
    const balanceUnconverted = await this.insuranceService.getContractBalance();
    this.contractBalance = Number.parseFloat(ethers.utils.formatEther(balanceUnconverted));
    console.log(this.contractBalance);
  }

  copyContractAddress() {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(this.contractAddress).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
}
