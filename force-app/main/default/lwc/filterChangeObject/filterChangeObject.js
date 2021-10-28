import { LightningElement } from 'lwc';

export default class FilterChangeObject extends LightningElement {

    value;

    optionsOfObjects = [
        { label: 'Account', value: 'Account' },
        { label: 'Contact', value: 'Contact' },
        { label: 'Opportunity', value: 'Opportunity' }
    ]

    handleChangeObjects(event) {
        this.value = event.detail.value;
        event.preventDefault();
        const selectEvent = new CustomEvent('select', {
            detail: this.value
        }); 
        this.dispatchEvent(selectEvent);
    }
}