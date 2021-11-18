public with sharing class LookUpController {

    @AuraEnabled(Cacheable = true)
    public static List<SObject> getRecordList(String addInfo, String sObjectName, String searchKey){
        String key = '%' + searchKey + '%';
        List<String> fieldsList = new List<String>{'Id', 'Name'};
        if (String.isNotBlank(addInfo)) {
            fieldsList.add(addInfo);
        }
        String fields = String.join(fieldsList, ', ');
        String template = 'SELECT {0} FROM {1} WHERE Name LIKE :key ORDER BY Name LIMIT 7';
        List<String> parameters = new List<String> {fields, sObjectName};
        String queryFormatted = String.format(template, parameters);
        return Database.query(queryFormatted);
    }

    @AuraEnabled(Cacheable = true)
    public static List<String> getAllObjectList(){
        List<String> objectNames = new List<String>();
        for ( Schema.SObjectType name : Schema.getGlobalDescribe().values() ) {
            DescribeSObjectResult dsr = name.getDescribe();
            if(dsr.isAccessible() && dsr.isSearchable()) {
                objectNames.add(dsr.getName());
            }
        }
        return objectNames;
    }
}
 