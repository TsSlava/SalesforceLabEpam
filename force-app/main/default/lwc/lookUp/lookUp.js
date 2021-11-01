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

    addInfoFieldApiName = '';

    @track
    searchKey = '';

    @track
    selectedRecord;

    boxClass = 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click';

    @wire(getRecordList, {
        sObjectName : '$sObjectApiName', 
        addInfo : '$addInfoFieldApiName',
        searchKey : '$searchKey'
    })
    records;

    // handleChangeAddInfo(event) {
    //     this.addInfoFieldApiName = event.detail.value;
    // }

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
        if(message.addInfo) {
            this.addInfoFieldApiName = message.addInfo;
        } else if(message.chosenObject) {
            this.sObjectApiName = message.chosenObject;
            // this.template.querySelector('input[data-id="lookup-input"]').value = '';
            this.selectedRecord = null;
            this.addInfoFieldApiName = null;
            this.searchKey = '';
        }
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

    handleSelect(event) {
        // console.log(event.target.tagName);
        const elem = event.target.closest('.record');
        this.selectedRecord = this.records.data.find( record => record.Id === elem.dataset.id);
        // console.log(JSON.parse(JSON.stringify(this.records.data)));
        // console.log(elem.dataset.id);
        // console.log(this.selectedRecord);
        // console.log(elem.classList);
    }

    handleRemove(event) {
        event.preventDefault();
        this.selectedRecord = undefined;
    }
}