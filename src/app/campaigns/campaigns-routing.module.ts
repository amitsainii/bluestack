import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignsHomeComponent } from './campaigns-home/campaigns-home.component';

const routes: Routes = [
  { 
    path: '',
    component: CampaignsHomeComponent,
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
