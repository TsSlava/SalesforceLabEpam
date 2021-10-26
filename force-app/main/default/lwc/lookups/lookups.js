import { LightningElement, wire, api, track } from 'lwc';
import getObjectList from '@salesforce/apex/SearchObject.getObjectList';

export default class Lookups extends LightningElement {

    @api
    sObjectName;

    limit = '3';

    order = 'ASC';

    addInfo = 'Phone';

    @track
    boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click';

    @track
    blurTimeout;

    @wire(getObjectList, {sObjectName : '$sObjectName', limits : '$limit', orderOfSearch : '$order', addInfo : '$addInfo'})
    objects;

    get options() {
        return [
            { label: '3', value: '3'},
            { label: '5', value: '5'},
            { label: '10', value: '10'},
            { label: '100', value: '100'}
        ];
    }

    get optionsOfOrder() {
        return [
            { label: 'Ascending Order', value: 'ASC'},
            { label: 'Descending Order', value: 'DESC'}
        ]
    }

    get optionsAddInfo() {
        return [
            { label: 'Phone', value: 'Phone'},
            { label: 'Industry', value: 'Industry'},
            { label: 'City', value: 'BillingCity'}
        ]
    }

    handleChange(event) {
        this.limit = event.detail.value;
    }

    handleChangeOrder(event) {
        this.order = event.detail.value;
    }

    handleAddInfo(event) {
        this.addInfo = event.detail.value;
    }

    handleClick() {
        this.boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    onBlur() {
        this.blurTimeout = setTimeout(() => {this.boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus', 300});
    }
    
}