import { Component, OnInit } from '@angular/core';
import { InsuranceService, WalletConnectorService } from '@core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isInsuranceContractOwner = false;

  constructor(
    private insuranceService: InsuranceService,
    private walletConnectorService: WalletConnectorService
  ) { }

  async ngOnInit() {
    const ownerAddress = await this.insuranceService.getContractOwnerAddress();
    const currentAddress = await this.walletConnectorService.getWalletAddress();
    console.log(ownerAddress);
    console.log(currentAddress);

    this.isInsuranceContractOwner = ownerAddress === currentAddress;
  }

}
