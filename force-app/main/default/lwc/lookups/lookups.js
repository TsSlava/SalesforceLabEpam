import { LightningElement, wire, api, track } from 'lwc';
import getObjectList from '@salesforce/apex/SearchObject.getObjectList';

export default class Lookups extends LightningElement {

    @api
    sObjectName;

    limit = '1';

    @track
    boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';

    @track
    blurTimeout;

    @wire(getObjectList, {sObjectName : '$sObjectName', limits : '$limit'})
    objects;

    get options() {
        return [
            { label: '1', value: '1'},
            { label: '3', value: '3'},
            { label: '5', value: '5'},
            { label: '10', value: '10'}
        ];
    }

    handleChange(event) {
        this.limit = event.detail.value;
    }

    handleClick() {
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    onBlur() {
        this.blurTimeout = setTimeout(() => {this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus', 300});
    }
    
}