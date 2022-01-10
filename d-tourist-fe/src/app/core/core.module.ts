import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {
  AppConfigService,
  CustomsService,
  GeolocationService,
  WalletConnectorService 
} from './services';

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
    WalletConnectorService,
    CustomsService,
    GeolocationService,
    AppConfigService
  ]
})
export class CoreModule { }
