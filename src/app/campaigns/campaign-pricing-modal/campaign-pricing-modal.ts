import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'campaigns-pricing-modal',
  templateUrl: './campaign-pricing-modal.html',
  styleUrls: ['./campaign-pricing-modal.scss']
})
export class CampaignsPricingModal {
  @Input() campaignData: any;
  @Input() showModal: boolean;
  @Output() modalClose = new EventEmitter();
  onBeforeClose:boolean;
  closeModal(){
    this.onBeforeClose = true;
    setTimeout(()=>{
      this.modalClose.emit();
      this.onBeforeClose = false;
    },300);
  }
  onWrapperClick(event){
    if(event.target.className.includes('modal-wrapper')){
      //close modal on outside click
      this.closeModal();
    }
  } 
}
