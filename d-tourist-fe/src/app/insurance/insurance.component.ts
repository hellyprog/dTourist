import { Component, OnInit } from '@angular/core';
import { Insurance } from '@core/models';
import { InsuranceService } from '@core/services';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  insurance!: Insurance;

  constructor(
    private insuranceService: InsuranceService
  ) { 
  }

  async ngOnInit() {
    const result = await this.insuranceService.getInsuranceInfo();
    console.log(result);
  }

  isInsuranceExpired(): Boolean {
    if (this.insurance) {
      return this.insurance.expiryDate > new Date();
    }

    return false;
  }
}
