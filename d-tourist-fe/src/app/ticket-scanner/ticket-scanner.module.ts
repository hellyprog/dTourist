import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketScannerRoutingModule } from './ticket-scanner-routing.module';
import { TicketScannerComponent } from './ticket-scanner.component';


@NgModule({
  declarations: [
    TicketScannerComponent
  ],
  imports: [
    CommonModule,
    TicketScannerRoutingModule
  ]
})
export class TicketScannerModule { }
