import { LightningElement, api } from 'lwc';

export default class Filter extends LightningElement {

    addInfoFieldApiName;

    optionsAddInfo = [
        { label: 'Phone', value: 'Phone' },
        { label: 'Industry', value: 'Industry' },
        { label: 'City', value: 'BillingCity' }
    ]

    handleChangeAddInfo(event) {
        this.addInfoFieldApiName = event.detail.value;
        event.preventDefault();
        const selectEvent = new CustomEvent('select', {
            detail: this.addInfoFieldApiName
        }); 
        this.dispatchEvent(selectEvent);
    }

}