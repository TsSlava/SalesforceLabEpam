public with sharing class SearchObject {

    @AuraEnabled(Cacheable = true)
    public static List<SObject> getObjectList(String sObjectName, String limits, String orderOfSearch){
        return Database.query('SELECT Id, Name FROM ' + sObjectName + ' ORDER BY Name ' + orderOfSearch + ' LIMIT ' + limits + '');
    }
}
