import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Insurance, InsuranceType } from '@core/models';
import { InsuranceService } from '@core/services';
import { ethers } from 'ethers';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  insurance!: Insurance;
  insuranceTypes!: InsuranceType[];
  isPurchaseMode = false;
  editedInsuranceTypeId!: number;
  totalPrice = 0;
  daysToPurchase = 0;

  constructor(
    private insuranceService: InsuranceService,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    await this.fetchInsuranceData();
    await this.fetchInsurancePrices();

    this.insuranceService.subscribeToContractEvent("InsurancePurchased", this.handleProcessedDataResult.bind(this));
    this.insuranceService.subscribeToContractEvent("InsurancePriceChanged", this.handleInsurancePriceChange.bind(this));
  }

  ngOnDestroy(): void {
    this.insuranceService.unsubscribeFromContractEvent("InsurancePurchased", this.handleProcessedDataResult.bind(this));
    this.insuranceService.subscribeToContractEvent("InsurancePriceChanged", this.handleInsurancePriceChange.bind(this));
  }

  async fetchInsuranceData() {
    const result = await this.insuranceService.getInsuranceInfo();
    this.insurance = new Insurance(result.insuranceType, result.expiryDate);
  }

  async fetchInsurancePrices() {
    const classicPrice = await this.insuranceService.getInsurancePrice(0);
    const premiumPrice = await this.insuranceService.getInsurancePrice(1);
    const classicPriceInEth = Number.parseFloat(ethers.utils.formatEther(classicPrice));
    const premiumPriceInEth = Number.parseFloat(ethers.utils.formatEther(premiumPrice));
    this.insuranceTypes = [
      new InsuranceType(0, "Classic", classicPriceInEth, "Classic insurance type"),
      new InsuranceType(1, "Premium", premiumPriceInEth, "Premium insurance type")
    ];
  }

  async handleInsurancePriceChange(insuranceType: number, newPrice: number) {
    this.insuranceTypes[insuranceType].dailyPrice = Number.parseFloat(ethers.utils.formatEther(newPrice));
  }

  async handleProcessedDataResult(success: boolean) {
    const snackBarText = success
      ? 'You successfully purchased insurance.'
      : 'Insurance purchase failed';

      this.snackBar.open(snackBarText, 'Close', {
        duration: 4000,
        panelClass: ['snackbar-light']
      });

      if (success) {
        await this.fetchInsuranceData();
      }
  }

  enablePurchaseMode(insuranceTypeId: number) {
    this.isPurchaseMode = true;
    this.editedInsuranceTypeId = insuranceTypeId;
  }

  formatDaysValue(event: any) {
    const value = Math.abs(Math.round(event.target.value));
    event.target.value = value;
    this.daysToPurchase = value;
    const insuranceType = this.insuranceTypes.find(x => x.id === this.editedInsuranceTypeId);
    this.totalPrice = (insuranceType?.dailyPrice ?? 0) * value;
  }

  disablePurchaseMode(event: MouseEvent) {
    event.stopPropagation();
    this.isPurchaseMode = false;
    this.editedInsuranceTypeId = -1;
    this.daysToPurchase = 0;
    this.totalPrice = 0;
  }

  async buyInsurance(event: MouseEvent) {
    event.stopPropagation();
    await this.insuranceService.buyInsurance(this.daysToPurchase, this.editedInsuranceTypeId, this.totalPrice);
    this.disablePurchaseMode(event);
  }

  isInsuranceExpired(): Boolean {
    if (this.insurance) {
      return this.insurance.expiryDate > new Date();
    }

    return false;
  }
}
