import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceManagementRoutingModule } from './insurance-management-routing.module';
import { InsuranceManagementComponent } from './insurance-management.component';


@NgModule({
  declarations: [
    InsuranceManagementComponent
  ],
  imports: [
    CommonModule,
    InsuranceManagementRoutingModule
  ]
})
export class InsuranceManagementModule { }
