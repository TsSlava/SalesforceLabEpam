import { LightningElement, wire, api, track } from 'lwc';
import getObjectList from '@salesforce/apex/SearchObject.getObjectList';

export default class Lookups extends LightningElement {

    @api
    sObjectApiName;

    addInfoFieldApiName = 'Phone';

    optionsAddInfo = [
        { label: 'Phone', value: 'Phone' },
        { label: 'Industry', value: 'Industry' },
        { label: 'City', value: 'BillingCity' }
    ]

    @track
    boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click';

    @wire(getObjectList, {sObjectApiName : '$sObjectName', addInfoFieldApiName : '$addInfo'})
    records;

    handleChange(event) {
        this.limit = event.detail.value;
    }

    handleOrderChange(event) {
        this.order = event.detail.value;
    }

    handleChangeAddInfo(event) {
        this.addInfo = event.detail.value;
    }

    handleClick() {
        this.boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    handleBlur() {
        this.boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }
    
}