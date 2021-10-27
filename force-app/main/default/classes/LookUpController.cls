public with sharing class LookUpController {

    @AuraEnabled(Cacheable = true)
    public static List<SObject> getRecordList(String sObjectName, String addInfo){
        return Database.query('SELECT Id, ' + addInfo + ', Name FROM ' + sObjectName + ' ORDER BY Name LIMIT 7');
    }
}
