import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WalletConnectedGuard } from '@core/guards/wallet-connected.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'customs',
    //canLoad: [WalletConnectedGuard],
    loadChildren: () =>
      import('./customs/customs.module').then((m) => m.CustomsModule),
  },
  { 
    path: 'insurance', 
    loadChildren: () => 
      import('./insurance/insurance.module').then(m => m.InsuranceModule) },
  { 
    path: 'insurance-management', 
    loadChildren: () => 
      import('./insurance-management/insurance-management.module').then(m => m.InsuranceManagementModule) 
  },
  { 
    path: 'ticket-scanner',
    loadChildren: () => 
      import('./ticket-scanner/ticket-scanner.module').then(m => m.TicketScannerModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
