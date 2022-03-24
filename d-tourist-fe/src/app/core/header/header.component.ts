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
  unformattedWalletAddress!: string | null;
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
    this.unformattedWalletAddress = await this.walletConnectorService.connectWallet();
   
    if (this.unformattedWalletAddress) {
      this.walletAddress = this.formatAddress(this.unformattedWalletAddress);
      await this.walletConnectorService.ensureCorrectNetworkConnected();
      await this.walletConnectorService.switchNetworkToRinkeby();
    }
  }

  copyWalletAddress() {
    const self = this;

    if (!navigator.clipboard || !this.unformattedWalletAddress) {
      return;
    }

    navigator.clipboard.writeText(this.unformattedWalletAddress).then(function() {
      const snackBarText = 'Text is copied to clipboard.';
      self.snackBar.open(snackBarText, 'Close', {
        duration: 4000,
        panelClass: ['snackbar-light']
      });
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  formatAddress(address: string): string {
    return `${address.slice(0, 3)}...${address.slice(address.length - 3)}`;
  }
}