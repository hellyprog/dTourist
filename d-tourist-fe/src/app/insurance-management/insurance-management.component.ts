import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private insuranceService: InsuranceService,
    private snackBar: MatSnackBar
  ) {
    this.contractAddress = this.appConfigService.contract.insuranceStoreContractAddress;
  }

  async ngOnInit() {
    const balanceUnconverted = await this.insuranceService.getContractBalance();
    this.contractBalance = Number.parseFloat(ethers.utils.formatEther(balanceUnconverted));
  }

  async withdrawInsuranceBalance() {
    await this.insuranceService.withdrawBalance();
  }

  copyContractAddress() {
    const self = this;

    if (!navigator.clipboard) {
      return;
    }

    navigator.clipboard.writeText(this.contractAddress).then(function() {
      const snackBarText = 'Text is copied to clipboard.';
      self.snackBar.open(snackBarText, 'Close', {
        duration: 4000,
        panelClass: ['snackbar-light']
      });
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
}
