import { Component, Input, Output, EventEmitter } from '@angular/core';
import {dateDiffInDays, formatDate, IdbService} from './../../core/services';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'campaigns-table',
  templateUrl: './campaign-table.component.html',
  styleUrls: ['./campaign-table.component.scss']
})
export class CampaignsTableComponent {
	@Input() data: any;// @Input is used to pass data from parent to child component
	@Input() activeTab: any;
	@Output() pricingClick = new EventEmitter(); // used to trigger parent function from child
	formatDate:any;
	dayDiffText:any = {};
  constructor(
		private IdbService: IdbService,// We are storing out json data on indexed db
		private _snackBar: MatSnackBar,
		public translate: TranslateService
	) {
		translate.stream(['dayDiff.today', 'dayDiff.past', 'dayDiff.future']).subscribe(res => {
      this.dayDiffText = {
				today: res['dayDiff.today'],
				past: res['dayDiff.past'],
				future: res['dayDiff.future'],
			}
    });		
		this.formatDate = formatDate;
  }
	getDayDiff(date){
		const diffDays = dateDiffInDays(date, new Date());
		if(diffDays < 0){
			return `${Math.abs(diffDays)} ${this.dayDiffText.past}`;
		} 
		else if(diffDays > 0){
				return `${Math.abs(diffDays)} ${this.dayDiffText.future}`;
		}
		else {
				return this.dayDiffText.today;
		}
	}
	showPricing(campaign){
		this.pricingClick.emit(campaign);
	}
	rescheduleCampaign(event, campaign, index){
		const timestamp = new Date(event.target.value).getTime();//convert date to timestamp
		const updatedCampaign = {...campaign, createdOn: timestamp};
		this.IdbService.reScheduleCampaign(updatedCampaign, this.data, this.activeTab, index).then(()=>{
			this.openSnackBar('Campaign rescheduled successfully');
		}, err=>{
      //exception handling goes here for example logging.
    });
	}
	openSnackBar(message: string, action?: string) {
		// to show toaster when rescheduling is done successfully
    this._snackBar.open(message, action, {
      duration: 2000, // toaster timeout
    });
  }
}
