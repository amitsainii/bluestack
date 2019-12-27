import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import pastCampaignData from './../../../assets/mock-data/past.json'; // mock json files
import upcomingCampaignData from './../../../assets/mock-data/upcoming.json';
import liveCampaignData from './../../../assets/mock-data/live.json';
import { dateDiffInDays } from './date-service.js';

@Injectable({
  providedIn: 'root' // no need to add this service to provider array
})
export class IdbService {
  db: any;
  store: any;
  objectStore: string = 'campaigns';
  constructor() {
    this.connectToIDB().then(db => {
      this.db = db;
    });
  }

  connectToIDB() {
    const _this = this;
    return openDB('bluestack', 1, { // 1 is current db version
      upgrade(db, oldVersion, newVersion, transaction) {
        //this is fired when new database is created or whenever its version is updated
        if (!oldVersion) {
          // this only fires when database is created. we use it to populate data to indexedDB from our mock json files
          const store = db.createObjectStore(_this.objectStore, { keyPath: 'key' });
          liveCampaignData.forEach(campaign => {
            campaign.createdOn = Date.now();// to set todays date on all entries from live.json. In case you recheck this project on your pc next day or anytime after please clear indexedDB first
          });
          // we are using seprate object store(like table in sql) for campaigns
          // populating data first time when this screen is loaded in browser
          store.put({ key: 'upcoming', value: upcomingCampaignData });
          store.put({ key: 'live', value: liveCampaignData });
          store.put({ key: 'past', value: pastCampaignData });
        }

      }
    });
  }

  getCampaign(key: string) {
    const _this = this;
    return new Promise((resolve,reject)=>{
      (function retry() { // this is to make sure db is initialized when our table start requesting data from indexedDB
        var retryInterval = 200;
        if (_this.db) {
          const tx = _this.db.transaction(_this.objectStore, 'readonly');// readonly transaction as we are not writing anything to store here
          const store = tx.objectStore(_this.objectStore);
          store.get(key).then(data => {
            resolve(data);
          },
          err=>{
            reject(err);
          });
        } else {
          setTimeout(function () {
            retry();
          }, retryInterval);
        }
      })();
    });
  }

  updateCampaignData(campaign, data) { //set new array value for past/future/live
      const tx = this.db.transaction(this.objectStore, 'readwrite');
      const store = tx.objectStore(this.objectStore);
      return store.put({ key: campaign, value: data });
  }
  fetchAndAddCampaign(campaign, newCampaign) { // find campaign by keys and update data. this determines to which tab campaign needed to be transferred when rescheduled
    const tx = this.db.transaction(this.objectStore, 'readwrite');
    const store = tx.objectStore(this.objectStore);
    return store.get(campaign).then(({value})=>{
      var updatedCampaignData = [...value,newCampaign];
      return store.put({ key: campaign, value: updatedCampaignData });
    });
  }
  reScheduleCampaign(updatedCampaign,campaignData, activeCampaign, index) {
    this;
    function reschedule(changeTab){
      if(changeTab){
        //when a campaign needs to move to different tab after rescheduling
        campaignData.splice(index, 1);
        return Promise.all([this.updateCampaignData(activeCampaign,campaignData), this.fetchAndAddCampaign(targetCampaign,updatedCampaign)]);
      }
      else {
        //when a campaign needs to stay in same tab after rescheduling
        campaignData.splice(index, 1, updatedCampaign);
        return this.updateCampaignData(activeCampaign,campaignData);
      }
    }
    const diffDays = dateDiffInDays(updatedCampaign.createdOn, new Date());
    let targetCampaign;
    let changeTab;
    if(diffDays < 0){
			if(activeCampaign != 'past'){
        targetCampaign = 'past';
        changeTab = true;
      }
		} 
		else if(diffDays > 0){
			if(activeCampaign != 'upcoming'){
        targetCampaign = 'upcoming';
        changeTab = true;
      }
		}
		else {
      if(activeCampaign != 'live'){
        targetCampaign = 'live';
        changeTab = true;
      }
    }
    return reschedule.call(this,changeTab);
  }

}