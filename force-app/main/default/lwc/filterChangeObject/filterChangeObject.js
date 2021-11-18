import { LightningElement, wire } from 'lwc';
import getAllObjectList from '@salesforce/apex/LookUpController.getAllObjectList';

export default class FilterChangeObject extends LightningElement {

    value;
    objects;

    @wire(getAllObjectList)
    getObjects({
        data, error
    }) {
        if(data) {
            this.objects = [];
            const names = JSON.parse(JSON.stringify(data));
            names.sort();
            for(let i = 0; i < data.length; i++) {
                this.objects[i] = {
                    label : names[i],
                    value : names[i]
                }
            }
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