public with sharing class LookUpController {

    @AuraEnabled(Cacheable = true)
    public static List<SObject> getRecordList(String addInfo, String sObjectName, String searchKey){
        String key = '%' + searchKey + '%';
        List<String> fieldsList = new List<String>{'Id', 'Name'};
        if (String.isNotBlank(addInfo) && !addInfo.equalsIgnoreCase('null')) {
            fieldsList.add(addInfo);
        }
        String fields = String.join(fieldsList, ', ');
        return Database.query('SELECT ' + fields + ' FROM ' + sObjectName + ' WHERE Name LIKE :key ORDER BY Name LIMIT 7');

    }
}
 