public class BatchDeleteRecords implements Database.Batchable<SObject>, Database.Stateful {

    Integer sum = 0;

    public Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT Id, Name FROM Test__c';
        return Database.getQueryLocator(query);
        // List<Test__c> listR = Database.QueryLocator(query);
        // System.debug(listR.size());
    }

    public void execute(Database.BatchableContext bc, List<Test__c> scope) {
        sum += scope.size();
        delete scope;
    }

    // BatchDeleteRecords bir = new BatchDeleteRecords();
    // Id batchId = Database.executeBatch(bir, 2000);

    public void finish(Database.BatchableContext bc) {
        System.debug(sum);
    }
}