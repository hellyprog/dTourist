import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WalletConnectorService } from '@core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @HostBinding('class.transparent') isHomePage: boolean = true;
  walletAddress!: string;
  RINKEBY_NETWORK_ID = 4;

  constructor(
    private router: Router,
    private walletConnectorService: WalletConnectorService) {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        const homePath = '/home';
        this.isHomePage = value.url === homePath || value.urlAfterRedirects === homePath;
      }
    });
  }

  async ngOnInit() {
    if (await this.walletConnectorService.isWalletConnected()) {
      await this.connectWallet();
    }

    this.walletConnectorService.subscribeToWalletEvent('chainChanged',
      this.walletConnectorService.ensureCorrectNetworkConnected.bind(this.walletConnectorService));
  }

  ngOnDestroy(): void {
    this.walletConnectorService.subscribeToWalletEvent('chainChanged',
      this.walletConnectorService.ensureCorrectNetworkConnected.bind(this.walletConnectorService));
  }

  async connectWallet() {
    const address = await this.walletConnectorService.connectWallet();
   
    if (address) {
      this.walletAddress = this.formatAddress(address);
      await this.walletConnectorService.ensureCorrectNetworkConnected();
      await this.walletConnectorService.switchNetworkToRinkeby();
    }
  }

  formatAddress(address: string): string {
    return `${address.slice(0, 3)}...${address.slice(address.length - 3)}`;
  }
}