public class BatchInsertRecords implements Database.Batchable<SObject>, Database.Stateful {

    // Integer muss = 0;
    // public Database.QueryLocator start(Database.BatchableContext bc) {
    //     String query = 'SELECT Id, Name FROM Test__c';
    //     return Database.getQueryLocator(query);
    // }

    // public void execute(Database.BatchableContext bc, List<Test__c> scope) {
    //     muss += scope.size();
    //     // List<Test__c> testsList = new List<Test__c>();
    //     // for(Integer i = 0; i < 10000; i++) {
    //     //     Test__c test = new Test__c();
    //     //     test.Name = 'Name' + i;
    //     //     test.Rating__c = Integer.valueOf((Math.random() * 100));
    //     //     testsList.add(test);
    //     // }
    //     // System.debug(testsList.size());
    //     // try {
    //     //     insert testsList;
    //     // } catch (Exception error) {
    //     //     System.debug(error);
    //     // }
    // }

    // // public void execute(Database.BatchableContext bc, List<Test__c> scope) {
    // //     System.debug(scope.size());
    // //     delete scope;
    // // }

    // // BatchInsertRecords bir = new BatchInsertRecords();
    // // Id batchId = Database.executeBatch(bir);
    // // AsyncApexJob job = [SELECT Id, Status, JobItemsProcessed, TotalJobItems, NumberOfErrors FROM AsyncApexJob WHERE ID = '7075j00000OSwFS'];

    // public void finish(Database.BatchableContext bc) {
    //     System.debug(muss);
    // }

    List<Test__c> testsList;
    public BatchInsertRecords(List<Test__c> listOfRecords) {
        testsList = listOfRecords;
    }

    public Iterable<SObject> start(Database.BatchableContext bc) {
        return testsList;
    }

    public void execute(Database.BatchableContext bc, List<Test__c> scope) {
        try {
            insert scope;
        } catch (Exception error) {
            System.debug('Error: ' + error);
        }
    }

    public void finish(Database.BatchableContext bc) {
        String query = 'SELECT Id FROM Test__c';
        Database.QueryLocator q = Database.getQueryLocator(query);
        Database.QueryLocatorIterator it = q.iterator();
        Integer count = 0;
        while (it.hasNext()) {
            Test__c a = (Test__c)it.next();
            count++;
        }
        System.debug('From bathc: ' + count);
        if(count < 100000) {
            AddRecords ad= new AddRecords();
            ad.addNewRecords();
        }
    }
    
}