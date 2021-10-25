import { LightningElement } from 'lwc';

export default class Filtration extends LightningElement {

    limit = '3';

    get options() {
        return [
            { label: '3', value: '3'},
            { label: '5', value: '5'},
            { label: '10', value: '10'}
        ];
    }

    handleChange(event) {
        this.limit = event.detail.value;
    }
}