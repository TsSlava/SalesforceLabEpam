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

    @track
    addInfoFieldApiName = '';

    @track
    searchKey = '';

    @track
    selectedRecord;

    @track
    records;

    @track 
    error;

    @track flag = false;

    @wire(getRecordList, {
        sObjectName : '$sObjectApiName', 
        addInfo : '$addInfoFieldApiName',
        searchKey : '$searchKey'
    })
    getRecords({
        data, error
    }) {
        if(data) {
            if(data.length > 0) {
                this.records = data.map(element => {
                    const {Id, Name } = element;
                    return {Id, Name, AddInfoData : element[this.addInfoFieldApiName]};
                });
            } else {
                this.records = null;
            }
        } else if (error) {
            this.error = error;
        }
    }

    get boxClass() {
        return 'slds-combobox slds-m-left_small slds-m-right_small slds-dropdown-trigger slds-dropdown-trigger_click ' +
            (this.flag ? 'slds-is-open' : '');
    }

    get changeMarginOfRecord() {
        const margin = 'slds-m-top_x-small';
        return this.addInfoFieldApiName ? `slds-listbox__option-text slds-m-left_xxx-small slds-listbox__option-text_entity` :
            `slds-listbox__option-text slds-m-left_xxx-small slds-listbox__option-text_entity ${margin}`;
    }

    get changeIconLocate() {
        return this.selectedRecord ? 'slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left-right' :
            'slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right'
    }

    get selectValue() {
        return this.selectedRecord ? this.selectedRecord.Name : this.searchKey;
    }

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
            if(message.addInfo == 'null') {
                this.addInfoFieldApiName = null;
            }
        } else if(message.chosenObject) {
            this.records = null;
            this.sObjectApiName = message.chosenObject;
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
        const elem = event.target.closest('.record');
        this.selectedRecord = this.records.find( record => record.Id === elem.dataset.id);
        this.hideValuesBlock();
    }

    handleRemove(event) {
        event.preventDefault();
        this.selectedRecord = null;
        this.searchKey = '';
    }

    showValuesBlock() {
		this.isShowInputMenu = true;
        this.flag = true;
	}

	hideValuesBlock() {
		this.isShowInputMenu = false;
        this.flag = false;
	}
}