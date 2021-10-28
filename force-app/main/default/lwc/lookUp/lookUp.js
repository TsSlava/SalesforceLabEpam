import { LightningElement, wire, api, track } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';
import getRecordList from '@salesforce/apex/LookUpController.getRecordList';

export default class Lookups extends LightningElement {

    subscription = null;

    @api
    sObjectApiName = 'Account';

    @wire(MessageContext)
    messageContext;

    addInfoFieldApiName = 'Phone';

    @track
    searchKey = '';

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
        this.changeBoxClass = true;
    }

    handleBlur() {
        this.changeBoxClass = false;
    }

    set changeBoxClass(flag) {
        this.boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click' +
            (flag ? ' slds-is-open' : '');
    }

    // handleSelect(event) {
    //     const eventData = event.detail;
    //     this.addInfoFieldApiName = eventData;
    // }

    // handleChooseObject(event) {
    //     const eventData = event.detail;
    //     this.sObjectApiName = eventData;
    // }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            RECORD_SELECTED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.addInfoFieldApiName = message.addInfo;
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    handleChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, 300);
    } 
}