import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletConnectorService } from './services/wallet-connector.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    WalletConnectorService
  ]
})
export class CoreModule { }
