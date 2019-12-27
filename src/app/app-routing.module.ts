import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren:'./campaigns/campaigns.module#CampaignsModule', // lazy loading for improving initial page render
      }
    ]
  },
  {
    path: '**',
    redirectTo:'/' //redirect all non matching paths to /
  }
];
// { preloadingStrategy: PreloadAllModules } --- prefetching lazy modules in the background.
@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }
