import { LightningElement, wire, api } from 'lwc';
import getObjectList from '@salesforce/apex/SearchObject.getObjectList';

export default class Lookups extends LightningElement {

    @api
    sObjectName;

    // @api
    // value;

    limit = '1';

    @wire(getObjectList, {sObjectName : '$sObjectName', limits : '$limit'})
    objects;

    // handleChange(event) {
    //     this.objects = event.detail.value;
    // }

    get options() {
        return [
            { label: '1', value: '1'},
            { label: '2', value: '2'},
            { label: '3', value: '3'}
        ];
    }

    handleChange(event) {
        this.limit = event.detail.value;
    }
    
}