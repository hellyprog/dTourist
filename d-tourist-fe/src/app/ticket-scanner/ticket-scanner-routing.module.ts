import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketScannerComponent } from './ticket-scanner.component';

const routes: Routes = [{ path: '', component: TicketScannerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketScannerRoutingModule { }
