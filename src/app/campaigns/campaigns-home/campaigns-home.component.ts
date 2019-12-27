import { Component, OnInit } from '@angular/core';
import { IdbService } from 'src/app/core/services';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'campaigns-home',
  templateUrl: './campaigns-home.component.html',
  styleUrls: ['./campaigns-home.component.scss']
})
export class CampaignsHomeComponent implements OnInit {
  campaignTabs: any;
  activeTab:String;
  selectedCampaign:any;
  showModal:boolean;
  campaignData:any;
  campaignTitles:any = {};
  constructor(
    private IdbService: IdbService,
    public translate: TranslateService
  ) {
    //updating tab headings when language is toggled
    translate.stream(['titles.upcomingCampaigns', 'titles.liveCampaigns', 'titles.pastCampaigns']).subscribe(res => {
      this.campaignTabs = [
        {key:'upcoming', title: res['titles.upcomingCampaigns'] },
        {key:'live', title: res['titles.liveCampaigns'] },
        {key:'past', title: res['titles.pastCampaigns'] }
      ];
    });
    this.activeTab = 'upcoming';
  }

  ngOnInit() {
    //upcoming tab is selected by default when we land on page
    this.setActiveTabData('upcoming');
  }
  
  setCurrentTab(tab:string) { // set active tab
    this.activeTab = tab;
    this.setActiveTabData(tab);
  }
  onPricingClick(campaignData){ // open pricing modal
    this.selectedCampaign = campaignData;
    this.showModal = true;
  }
  onModalClose(){ // close pricing modal
    this.showModal = false;
  }
  setActiveTabData(campaign:string) { // fetch data to populate from indexedDB
    this.IdbService.getCampaign(campaign).then((data:any)=>{
      this.campaignData = data.value;
    }, err=>{
      //exception handling goes here for example logging.
    });
  }
}
