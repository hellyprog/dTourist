import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomsComponent } from './customs.component';

const routes: Routes = [{ path: '', component: CustomsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomsRoutingModule { }
