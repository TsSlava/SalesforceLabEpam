public with sharing class ImplementBatch {

    public void implementBatch(List<Test__c> testsList) {
        BatchInsertRecords bir = new BatchInsertRecords(testsList);
        Database.executeBatch(bir, 2000);
    }
}
