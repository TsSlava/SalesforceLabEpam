import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import getAllObjectList from '@salesforce/apex/LookUpController.getAllObjectList';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

export default class FilterChangeObject extends LightningElement {

    value;

    @wire(MessageContext)
    messageContext;

    objects;

    @wire(getAllObjectList)
    getObjects({
        data, error
    }) {
        if(data) {
            this.objects = [];
            const names = JSON.parse(JSON.stringify(data));
            names.sort();
            for(let i = 0; i < data.length; i++) {
                this.objects[i] = {
                    label : names[i],
                    value : names[i]
                }
            }
        } else if (error) {
            this.error = error;
        }
    }

    handleChangeObjects(event) {
        const payload = { chosenObject: event.target.value };
        const payload2 = { chosenObjectToFilter: event.target.value};
        console.log(this.objects);

        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload2);

    }
}