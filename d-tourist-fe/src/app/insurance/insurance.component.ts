import { Component, OnInit } from '@angular/core';
import { Insurance } from '@core/models';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {
  insurance!: Insurance;

  constructor() { 
    this.insurance = new Insurance(0, 1644254495);
  }

  ngOnInit(): void {
  }

  isInsuranceExpired(): Boolean {
    if (this.insurance) {
      return this.insurance.expiryDate > new Date();
    }

    return false;
  }
}
