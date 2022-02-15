import { Component, OnInit } from '@angular/core';
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
    private insuranceService: InsuranceService
  ) { }

  async ngOnInit() {
    const result = await this.insuranceService.getInsuranceInfo();
    const classicPrice = await this.insuranceService.getInsurancePrice(0);
    const premiumPrice = await this.insuranceService.getInsurancePrice(1);
    const classicPriceInEth = Number.parseFloat(ethers.utils.formatEther(classicPrice));
    const premiumPriceInEth = Number.parseFloat(ethers.utils.formatEther(premiumPrice));
    this.insuranceTypes = [
      new InsuranceType(0, "Classic", classicPriceInEth, "Classic insurance type"),
      new InsuranceType(1, "Premium", premiumPriceInEth, "Premium insurance type")
    ]
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
