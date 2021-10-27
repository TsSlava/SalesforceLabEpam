public with sharing class LookUpController {

    // @AuraEnabled(Cacheable = true)
    // public static List<SObject> getRecordList(String sObjectName, String addInfo, String searchKey){
    //     String key = '%' + searchKey + '%';
    //     // return Database.query('SELECT Id, ' + addInfo + ', Name FROM ' + sObjectName + ' WHERE Name LIKE ' + key + ' ORDER BY Name LIMIT 7');
    //     // return Database.query('SELECT Id, ' + addInfo + ', Name FROM ' + sObjectName + ' ORDER BY Name LIMIT 7');
    //     return [SELECT Name, Phone FROM Account WHERE Name LIKE :key LIMIT 7];
    // }

    @AuraEnabled(Cacheable = true)
    public static List<SObject> getRecordList(String addInfo, String sObjectName, String searchKey){
        String key = '%' + searchKey + '%';
        return Database.query('SELECT Id, ' + addInfo + ', Name FROM ' + sObjectName + ' WHERE Name = :key ORDER BY Name LIMIT 7');
    }

}
