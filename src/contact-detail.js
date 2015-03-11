import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {App} from './app';
import {ContactUpdated,ContactViewed} from './messages';
import {Toastr} from './toast';

export class ContactDetail {
  static inject() { return [App,WebAPI,EventAggregator,Toastr]; }
  constructor(app,api,ea, toastr){
    this.app = app;
    this.api = api;
    this.ea = ea;
    this.toastr = toastr;
  }

  activate(params, qs, config){
    return this.api[params.id === 'new' ? 'getNewContact' : 'getContactDetails' ](params.id).then(contact => {
      this.contact = contact;
      config.navModel.title = contact.firstName;
      this.originalJSON = JSON.stringify(contact);
      this.ea.publish(new ContactViewed(contact));
      return contact;
    });
  }

  get canSave(){
    return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
  }

  save(){
    this.api.saveContact(this.contact).then(contact => {
      this.contact = contact;
      this.originalJSON = JSON.stringify(this.contact);
      this.ea.publish(new ContactUpdated(this.contact));
      return contact;
    }).then(contact => {
      console.log(contact);
      this.toastr.put(contact.firstName + ' updated');
    });
  }

  canDeactivate(){
    if(this.originalJSON != JSON.stringify(this.contact)){
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if(!result){
        this.ea.publish(new ContactViewed(this.contact));
      }

      return result;
    }

    return true;
  }
}
