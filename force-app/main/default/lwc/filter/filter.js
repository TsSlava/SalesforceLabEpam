import { LightningElement, api } from 'lwc';

export default class Filter extends LightningElement {

    @api
    addInfoFieldApiName = 'Phone';

    optionsAddInfo = [
        { label: 'Phone', value: 'Phone' },
        { label: 'Industry', value: 'Industry' },
        { label: 'City', value: 'BillingCity' }
    ]

    handleChangeAddInfo(event) {
        this.addInfoFieldApiName = event.detail.value;
    }

}