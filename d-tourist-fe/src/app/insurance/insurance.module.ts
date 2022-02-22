import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceComponent } from './insurance.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    InsuranceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InsuranceRoutingModule,
    MatSnackBarModule
  ]
})
export class InsuranceModule { }
