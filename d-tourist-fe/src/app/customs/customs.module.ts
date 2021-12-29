import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomsRoutingModule } from './customs-routing.module';
import { CustomsComponent } from './customs.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CustomsComponent
  ],
  imports: [
    CommonModule,
    CustomsRoutingModule,
    MatIconModule
  ]
})
export class CustomsModule { }
