import { LightningElement, api, wire, track } from 'lwc';
import { publish, subscribe, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

export default class Filter extends LightningElement {

    subscription = null;

    addInfoFieldApiName;

    @track
    sObjectApiName = 'Account';

    @wire(MessageContext)
    messageContext;

    @track
    optionsAddInfo = [
        { label: 'Phone', value: 'Phone' },
        { label: 'Industry', value: 'Industry' },
        { label: 'City', value: 'BillingCity' },
        { label: '-None-', value: 'null'}
    ];

    optionsAddInfoAccount = [
        { label: 'Phone', value: 'Phone' },
        { label: 'Industry', value: 'Industry' },
        { label: 'City', value: 'BillingCity' },
        { label: '-None-', value: 'null'}
    ]

    optionsAddInfoContact = [
        { label: 'Phone', value: 'Phone'},
        { label: 'Title', value: 'Title'},
        { label: 'Email', value: 'Email'},
        { label: '-None-', value: 'null'}
    ]

    optionsAddInfoOpportunity = [
        { label: 'Amount', value: 'Amount'},
        { label: 'Close Date', value: 'CloseDate'},
        { label: 'Stage', value: 'StageName'},
        { label: '-None-', value: 'null'}
    ]

    handleChangeAddInfo(event) {
        const payload = { addInfo: event.target.value };

        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
    }

    subscribeToMessageChannel() {

        this.subscription = subscribe(
            this.messageContext,
            RECORD_SELECTED_CHANNEL,
            (message) => this.handleMessage(message)
        );
        console.log(this.subscription);
    }

    handleMessage(message) {
        if(message.chosenObjectToFilter) {
            this.sObjectApiName = message.chosenObjectToFilter;
            if(this.sObjectApiName == 'Account') {
                this.optionsAddInfo = this.optionsAddInfoAccount;
            } else if (this.sObjectApiName == 'Contact') {
                this.optionsAddInfo = this.optionsAddInfoContact;
            } else if (this.sObjectApiName == 'Opportunity') {
                this.optionsAddInfo = this.optionsAddInfoOpportunity;
            }
        }
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

}