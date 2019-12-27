import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CampaignsHomeComponent } from './campaigns-home/campaigns-home.component';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsTableComponent } from './campaign-table/campaign-table.component';
import { CampaignsPricingModal } from './campaign-pricing-modal/campaign-pricing-modal';

@NgModule({
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    SharedModule,
  ],
  declarations: [
    CampaignsHomeComponent,
    CampaignsTableComponent,
    CampaignsPricingModal
  ]
})
export class CampaignsModule { }
