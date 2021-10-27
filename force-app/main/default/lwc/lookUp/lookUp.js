import { LightningElement, wire, api, track } from 'lwc';
import getRecordList from '@salesforce/apex/LookUpController.getRecordList';

export default class Lookups extends LightningElement {

    @api
    sObjectApiName;

    @api
    addInfoFieldApiName;

    // optionsAddInfo = [
    //     { label: 'Phone', value: 'Phone' },
    //     { label: 'Industry', value: 'Industry' },
    //     { label: 'City', value: 'BillingCity' }
    // ]

    @track
    boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click';

    @wire(getRecordList, {sObjectName : '$sObjectApiName', addInfo : '$addInfoFieldApiName'})
    records;

    handleChangeAddInfo(event) {
        this.addInfoFieldApiName = event.detail.value;
    }

    handleClick() {
        this.boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    handleBlur() {
        this.boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }
    
}