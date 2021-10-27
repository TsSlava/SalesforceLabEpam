public with sharing class LookUpController {

    @AuraEnabled(Cacheable = true)
    public static List<SObject> getRecordList(String addInfo, String sObjectName, String searchKey){
        String key = '%' + searchKey + '%';
        return Database.query('SELECT Id, ' + addInfo + ', Name FROM ' + sObjectName + ' WHERE Name = :key ORDER BY Name LIMIT 7');
    }

}
