public with sharing class SearchObject {

    @AuraEnabled(Cacheable = true)
    public static List<SObject> getObjectList(String sObjectName, String limits){
        return Database.query('SELECT Id, Name FROM ' + sObjectName + ' LIMIT ' + limits + '');
    }
}
