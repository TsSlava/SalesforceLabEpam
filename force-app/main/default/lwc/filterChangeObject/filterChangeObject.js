import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

export default class FilterChangeObject extends LightningElement {

    value;

    @wire(MessageContext)
    messageContext;

    optionsOfObjects = [
        { label: 'Account', value: 'Account' },
        { label: 'Contact', value: 'Contact' },
        { label: 'Opportunity', value: 'Opportunity' }
    ]

    // handleChangeObjects(event) {
    //     this.value = event.detail.value;
    //     event.preventDefault();
    //     const selectEvent = new CustomEvent('select', {
    //         detail: this.value
    //     }); 
    //     this.dispatchEvent(selectEvent);
    // }

    // Доставать все объекты, c бэка

    handleChangeObjects(event) {
        const payload = { chosenObject: event.target.value };
        // console.log(event.target.value, 'changeObject');
        const payload2 = { chosenObjectToFilter: event.target.value};

        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload2);

    }
}