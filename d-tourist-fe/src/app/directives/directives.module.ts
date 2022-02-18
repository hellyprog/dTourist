import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceOwnerDirective } from './insurance-owner.directive';



@NgModule({
  declarations: [
    InsuranceOwnerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InsuranceOwnerDirective
  ]
})
export class DirectivesModule { }
