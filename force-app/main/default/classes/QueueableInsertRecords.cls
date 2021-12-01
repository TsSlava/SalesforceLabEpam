public with sharing class QueueableInsertRecords implements Queueable{

    private List<SObject> testsList;
    
    public QueueableInsertRecords(List<Test__c> listOfTests) {
        this.testsList = listOfTests;
    }
 

    public void execute(QueueableContext context){
        try {
            Database.insertImmediate(testsList);
        } catch (Exception e) {
            System.debug('Que: ' + e.getMessage());
        }

        String query = 'SELECT Id FROM Test__c';
        Database.QueryLocator q = Database.getQueryLocator(query);
        Database.QueryLocatorIterator it = q.iterator();
        Integer count = 0;
        while (it.hasNext()) {
            Test__c a = (Test__c)it.next();
            count++;
        }
        System.debug('After: ' + count);
        if(count < 1500000) {
            AddRecords ar = new AddRecords();
            ar.addNewRecords();
        }
            
    }

 
}
