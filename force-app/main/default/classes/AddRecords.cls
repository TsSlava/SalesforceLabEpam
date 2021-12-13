public with sharing class AddRecords {
    public void addNewRecords() {
        List<Test__c> testsList = new List<Test__c>();
        for(Integer i = 0; i < 10000; i++) {
            Test__c test = new Test__c();
            test.Name = 'Name' + i;
            test.Rating__c = Integer.valueOf((Math.random() * 100));
            testsList.add(test);
        }

        BatchInsertRecords bir = new BatchInsertRecords(testsList);
        Database.executeBatch(bir, 2000);
        // ImplementBatch ib = new ImplementBatch();
        // ib.implementBatch(testsList);
        // QueueableInsertRecords qi = new QueueableInsertRecords(testsList);
        // System.enqueueJob(qi);

    }

// AddRecords ar = new AddRecords();
// ar.addNewRecords();

}