import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomsRoutingModule } from './customs-routing.module';
import { CustomsComponent } from './customs.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    CustomsComponent
  ],
  imports: [
    CommonModule,
    CustomsRoutingModule,
    MatIconModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomsModule { }
