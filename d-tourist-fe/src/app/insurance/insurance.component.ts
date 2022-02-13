import { Component, OnInit } from '@angular/core';
import { Insurance, InsuranceType } from '@core/models';
import { InsuranceService } from '@core/services';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  insurance!: Insurance;
  insuranceTypes!: InsuranceType[];
  isPurchaseMode = false;
  editedInsuranceTypeId?: number;

  constructor(
    private insuranceService: InsuranceService
  ) {
    this.insuranceTypes = [
      new InsuranceType(0, "Classic", 0.01, "Classic insurance type"),
      new InsuranceType(1, "Premium", 0.015, "Premium insurance type")
    ]
  }

  async ngOnInit() {
    const result = await this.insuranceService.getInsuranceInfo();
    console.log(result);
  }

  enablePurchaseMode(insuranceTypeId: number) {
    this.isPurchaseMode = true;
    this.editedInsuranceTypeId = insuranceTypeId;
  }

  disablePurchaseMode(event: MouseEvent) {
    event.stopPropagation();
    this.isPurchaseMode = false;
    this.editedInsuranceTypeId = undefined;
  }

  buyInsurance(insuranceType: InsuranceType, event: MouseEvent) {
    event.stopPropagation();
    alert(insuranceType.name);
    this.disablePurchaseMode(event);
  }

  isInsuranceExpired(): Boolean {
    if (this.insurance) {
      return this.insurance.expiryDate > new Date();
    }

    return false;
  }
}
