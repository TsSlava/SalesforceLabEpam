public with sharing class SearchObject {

    @AuraEnabled(Cacheable = true)
    public static List<SObject> getObjectList(String sObjectName){
        return Database.query('SELECT Id, Name FROM ' + sObjectName + '  LIMIT 5');

    }
}
