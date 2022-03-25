import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceManagementRoutingModule } from './insurance-management-routing.module';
import { InsuranceManagementComponent } from './insurance-management.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    InsuranceManagementComponent
  ],
  imports: [
    CommonModule,
    InsuranceManagementRoutingModule,
    MatSnackBarModule
  ]
})
export class InsuranceManagementModule { }
