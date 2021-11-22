import { LightningElement } from 'lwc';

export default class Demo extends LightningElement {

    sObjectApiName = 'Account';

    addInfo = '';


    passAddInfo(event) {
        this.addInfo = event.detail;
    }

    passNewObject(event) {
        this.sObjectApiName = event.detail;
        this.addInfo = '';
    }
}