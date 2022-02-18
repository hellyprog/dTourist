import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DirectivesModule } from '@directives/directives.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    DirectivesModule,
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
