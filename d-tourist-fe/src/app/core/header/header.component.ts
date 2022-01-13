import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { WalletConnectorService } from '@core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.transparent') isHomePage: boolean = true;
  walletAddress!: string;

  constructor(private router: Router, private walletConnectorService: WalletConnectorService) {
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
  }

  async connectWallet() {
    const address = await this.walletConnectorService.connectWallet();
    this.walletAddress = this.formatAddress(address);
  }

  formatAddress(address: string): string {
    return `${address.slice(0, 3)}...${address.slice(address.length - 3)}`;
  }
}
