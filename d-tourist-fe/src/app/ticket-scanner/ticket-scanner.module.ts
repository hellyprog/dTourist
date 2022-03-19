import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketScannerRoutingModule } from './ticket-scanner-routing.module';
import { TicketScannerComponent } from './ticket-scanner.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TicketScannerComponent
  ],
  imports: [
    CommonModule,
    TicketScannerRoutingModule,
    FormsModule
  ]
})
export class TicketScannerModule { }
