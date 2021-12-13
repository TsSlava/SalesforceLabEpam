import { LightningElement, wire } from 'lwc';
import getQueriableSObjectApiNames from '@salesforce/apex/LookUpController.getQueriableSObjectApiNames';

export default class FilterChangeObject extends LightningElement {

    value;
    objects;

    @wire(getQueriableSObjectApiNames)
    getObjects({
        data, error
    }) {
        if(data) {
            this.objects = [];
            const arrayOfObjects = Array.from(data);
            arrayOfObjects.sort();
            this.objects = arrayOfObjects.map(element => {
                return { label : element, value : element}
            })
        } else if (error) {
            this.error = error;
        }
    }

    handleChangeObjects(event) {
        this.value = event.detail.value;
        event.preventDefault();
        const selectEvent = new CustomEvent('select', {
            detail: this.value
        }); 
        this.dispatchEvent(selectEvent);
    }
}