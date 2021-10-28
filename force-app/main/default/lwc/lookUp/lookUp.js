import { LightningElement, wire, api, track } from 'lwc';
import getRecordList from '@salesforce/apex/LookUpController.getRecordList';

export default class Lookups extends LightningElement {

    @api
    sObjectApiName = 'Account';

    addInfoFieldApiName = 'Phone';

    // @track
    // flag = false;

    @track
    searchKey = '';

    @track
    boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click';

    @wire(getRecordList, {
        sObjectName : '$sObjectApiName', 
        addInfo : '$addInfoFieldApiName',
        searchKey : '$searchKey'
    })
    records;

    handleChangeAddInfo(event) {
        this.addInfoFieldApiName = event.detail.value;
    }

    handleClick() {
        this.boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
        // this.flag = true;
        // console.log(this.flag);
        // this.test;
    }

    handleBlur() {
        this.boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click';
        // this.flag = false;
        // console.log(this.flag);
        // this.test;
    }

        // get test() {
        //     return this._boxClass;
        // }

        // set test(flag) {
        //     if (flag === false) {
        //         console.log('work');
        //         this.boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click';
        //     } else {
        //         this.boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
        //     }
        // }

    handleSelect(event) {
        const eventData = event.detail;
        this.addInfoFieldApiName = eventData;
    }

    handleChooseObject(event) {
        const eventData = event.detail;
        this.sObjectApiName = eventData;
    }

    handleChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, 300);
    } 
}