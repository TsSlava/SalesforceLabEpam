import { LightningElement, wire, api } from 'lwc';
import getObjectList from '@salesforce/apex/SearchObject.getObjectList';

export default class Lookups extends LightningElement {

    @api
    sObjectName;

    @wire(getObjectList, {sObjectName : '$sObjectName'})
    objects;

    handleChange(event) {
        this.objects = event.detail.value;
    }
    
}