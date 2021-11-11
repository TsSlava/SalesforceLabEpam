import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import getAllObjectList from '@salesforce/apex/LookUpController.getAllObjectList';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

export default class FilterChangeObject extends LightningElement {

    value;

    @wire(MessageContext)
    messageContext;

    objects;

    // optionsOfObjects = [
    //     { label: 'Account', value: 'Account' },
    //     { label: 'Contact', value: 'Contact' },
    //     { label: 'Opportunity', value: 'Opportunity' }

    //     getRecords({
    //         data, error
    //     }) {
    //         if(data) {
    //             this.records = data.map(element => {
    //                 const {Id, Name } = element;
    //                 return {Id, Name, AddInfoData : element[this.addInfoFieldApiName]};
    //             });
    //         } else if (error) {
    //             this.error = error;
    //         }
    //     }
    //     for(let i = 0; i < data.length; i++) {
    //         this.records[i] = {
    //             Id : data[i].Id,
    //             Name : data[i].Name,
    //     AddInfoData : data[i][this.addInfoFieldApiName]
    // }
// }

    @wire(getAllObjectList)
    getObjects({
        data, error
    }) {
        if(data) {
            this.objects = [];
            for(const item of data) {
                this.objects[item] = {
                    label : data[item],
                    value : data[item]
                }
            }
            this.objects.sort();
        } else if (error) {
            this.error = error;
        }
    }

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
        console.log(this.objects);

        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload2);

    }
}