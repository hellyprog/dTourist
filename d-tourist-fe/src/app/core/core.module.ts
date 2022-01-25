import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  AppConfigService,
  CustomsService,
  GeolocationService,
  InsuranceService,
  WalletConnectorService 
} from './services';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    WalletConnectorService,
    CustomsService,
    GeolocationService,
    AppConfigService,
    InsuranceService
  ]
})
export class CoreModule { }
