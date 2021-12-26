import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomsRoutingModule } from './customs-routing.module';
import { CustomsComponent } from './customs.component';


@NgModule({
  declarations: [
    CustomsComponent
  ],
  imports: [
    CommonModule,
    CustomsRoutingModule
  ]
})
export class CustomsModule { }
