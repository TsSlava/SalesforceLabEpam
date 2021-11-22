import { LightningElement, api } from 'lwc';

export default class Filter extends LightningElement {

    @api
    addInfoFieldApiName = [];

    @api
    sObjectApiName;

    optionsAddInfoAccount = [
        { label: 'Phone', value: 'Phone' },
        { label: 'Industry', value: 'Industry' },
        { label: 'City', value: 'BillingCity' },
        { label: '-None-', value: ''}
    ]

    optionsAddInfoContact = [
        { label: 'Phone', value: 'Phone'},
        { label: 'Title', value: 'Title'},
        { label: 'Email', value: 'Email'},
        { label: '-None-', value: ''}
    ]

    optionsAddInfoOpportunity = [
        { label: 'Amount', value: 'Amount'},
        { label: 'Close Date', value: 'CloseDate'},
        { label: 'Stage', value: 'StageName'},
        { label: '-None-', value: ''}
    ]

    handleChangeAddInfo(event) {
            this.addInfoFieldApiName.push(event.detail.value);
            console.log(this.addInfoFieldApiName);
            // this.addInfoFieldApiName = event.detail.value;
            if(event.detail.value == '') {
                this.addInfoFieldApiName = [];
            }
            console.log(this.addInfoFieldApiName);
            event.preventDefault();
            const selectEvent = new CustomEvent('select', {
                detail: this.addInfoFieldApiName
            }); 
            this.dispatchEvent(selectEvent);
        }

    get optionsAddInfo() {
        if(this.sObjectApiName == 'Account') {
            this.addInfoFieldApiName = [];
            return this.optionsAddInfoAccount;
        } else if(this.sObjectApiName == 'Contact') {
            this.addInfoFieldApiName = [];
            return this.optionsAddInfoContact;
        } else if(this.sObjectApiName == 'Opportunity') {
            this.addInfoFieldApiName = [];
            return this.optionsAddInfoOpportunity;
        }
    }
}