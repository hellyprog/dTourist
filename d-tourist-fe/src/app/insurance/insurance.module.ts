import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceComponent } from './insurance.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InsuranceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InsuranceRoutingModule
  ]
})
export class InsuranceModule { }
