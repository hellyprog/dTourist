import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private walletConnectorService: WalletConnectorService,
    private snackBar: MatSnackBar) {
    this.router.events.subscribe((value) => {
      if (value instanceof NavigationEnd) {
        const homePath = '/home';
        this.isHomePage = value.url === homePath || value.urlAfterRedirects === homePath;
      }
    });
  }

  async ngOnInit() {
    if (await this.walletConnectorService.isWalletConnected()) {
      this.connectWallet();
    }

    this.walletConnectorService.subscribeToWalletEvent('networkChanged', this.handleNetworkChange.bind(this));
  }

  ngOnDestroy(): void {
    this.walletConnectorService.subscribeToWalletEvent('networkChanged', this.handleNetworkChange.bind(this));
  }

  handleNetworkChange(networkId: string) {
    if (Number(networkId) !== this.RINKEBY_NETWORK_ID) {
      const snackBarText = 'Selected network is incorrect. Please switch to Rinkeby network.';
      let snackBarRef = this.snackBar.open(snackBarText, 'Close', {
        duration: 2000,
        panelClass: ['snackbar-primary']
      });
    }
  }

  async connectWallet() {
    const address = await this.walletConnectorService.connectWallet();
    this.walletAddress = this.formatAddress(address);
  }

  formatAddress(address: string): string {
    return `${address.slice(0, 3)}...${address.slice(address.length - 3)}`;
  }
}