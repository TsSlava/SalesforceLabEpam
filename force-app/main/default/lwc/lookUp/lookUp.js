import { LightningElement, wire, api, track } from 'lwc';
import getRecordList from '@salesforce/apex/LookUpController.getRecordList';

export default class Lookups extends LightningElement {

    @api
    sObjectApiName;

    @api
    addInfoFieldApiName;

    @track
    searchKey = '';

    @track
    selectedRecord;

    @track
    records;

    @track 
    error;

    @track 
    flag = false;

    @wire(getRecordList, {
        sObjectName : '$sObjectApiName', 
        addInfo : '$addInfoFieldApiName',
        searchKey : '$searchKey'
    })
    getRecords({
        data, error
    }) {
        console.log('yes' + data);
        console.log(error);
        if(data) {
            if(data.length > 0) {
                this.records = data.map(element => {
                    const {Id, Name} = element;
                    console.log(element[this.addInfoFieldApiName[0]]);
                    console.log(element[this.addInfoFieldApiName[1]]);
                    return {Id, Name, AddInfoData : element[this.addInfoFieldApiName]};
                    // return {Id : element.Id, Name : element.Name, AddInfoData : element[this.addInfoFieldApiName]};

                })
                console.log(this.records);
                console.log(this.addInfoFieldApiName[0]);
                ;
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