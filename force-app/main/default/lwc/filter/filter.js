import { LightningElement, api, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

export default class Filter extends LightningElement {

    addInfoFieldApiName;

    @wire(MessageContext)
    messageContext;

    optionsAddInfo = [
        { label: 'Phone', value: 'Phone' },
        { label: 'Industry', value: 'Industry' },
        { label: 'City', value: 'BillingCity' }
    ]

    // handleChangeAddInfo(event) {
    //     this.addInfoFieldApiName = event.detail.value;
    //     event.preventDefault();
    //     const selectEvent = new CustomEvent('select', {
    //         detail: this.addInfoFieldApiName
    //     }); 
    //     this.dispatchEvent(selectEvent);
    // }

    handleChangeAddInfo(event) {
        const payload = { addInfo: event.target.value };

        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
    }

}