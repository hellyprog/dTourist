import { Component, OnInit } from '@angular/core';
import { Insurance } from '@core/models';
import { InsuranceType } from '@core/models/insurance-type.model';
import { InsuranceService } from '@core/services';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  insurance!: Insurance;
  insuranceTypes!: InsuranceType[];

  constructor(
    private insuranceService: InsuranceService
  ) {
    this.insuranceTypes = [
      new InsuranceType("Classic", 0.01, "Classic insurance type"),
      new InsuranceType("Premium", 0.015, "Premium insurance type")
    ]
  }

  async ngOnInit() {
    const result = await this.insuranceService.getInsuranceInfo();
    console.log(result);
  }

  openBuyModal(insuranceType: InsuranceType) {
    alert(insuranceType.name);
  }

  isInsuranceExpired(): Boolean {
    if (this.insurance) {
      return this.insurance.expiryDate > new Date();
    }

    return false;
  }
}
