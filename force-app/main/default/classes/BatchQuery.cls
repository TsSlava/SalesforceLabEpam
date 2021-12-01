public with sharing class BatchQuery implements Database.Batchable<SObject>, Database.Stateful {
    Integer muss = 0;
    public Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT Id, Name FROM Test__c';
        return Database.getQueryLocator(query);
    }

    public void execute(Database.BatchableContext bc, List<Test__c> scope) {
        muss += scope.size();
        System.debug(scope.size());
        
    }



    // BatchQuery bir = new BatchQuery();
    // Id batchId = Database.executeBatch(bir);
   
    public void finish(Database.BatchableContext bc) {
        System.debug(muss);
    }

}
