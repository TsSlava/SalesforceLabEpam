public with sharing class BatchHandlePlaces implements Database.Batchable<SObject>, Database.Stateful{

    Integer place;
    Integer count = 0;
    
    public BatchHandlePlaces(Integer place) {
        this.place = place;
    }

    public Database.QueryLocator start(Database.BatchableContext bc) {
        String query = 'SELECT Id, Name FROM Test__c WHERE Rating__c =: place';
        Database.QueryLocator records = Database.getQueryLocator(query);
        Database.QueryLocatorIterator iterate = records.iterator();
        while (iterate.hasNext()) {
            Test__c record = (Test__c)iterate.next();
            count++;
        }
        return records;
    }

    public void execute(Database.BatchableContext bc, List<Test__c> scope) {
        String template = '{0}-{1}';
        List<String> parameters = new List<String> {String.valueOf(place), String.valueOf(count)};
        String stringFormatted = String.format(template, parameters);
        for(Test__c test : scope) {
            test.Place__c = stringFormatted;
        }
        try {
            update scope;
        } catch (Exception error) {
            System.debug(error);
        }
    }

    public void finish(Database.BatchableContext bc) {
        
    }
}
