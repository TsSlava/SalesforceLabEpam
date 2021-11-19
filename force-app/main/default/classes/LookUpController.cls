public with sharing class LookUpController {

    // @AuraEnabled(Cacheable = true)
    // public static List<SObject> getRecordList(String addInfo, String sObjectName, String searchKey){
    //     String key = '%' + String.escapeSingleQuotes(searchKey) + '%';
    //     List<String> fieldsList = new List<String>{'Id', 'Name'};
    //     if (String.isNotBlank(addInfo)) {
    //         fieldsList.add(addInfo);
    //     }
    //     String fields = String.join(fieldsList, ', ');
    //     String template = 'SELECT {0} FROM {1} WHERE Name LIKE :key ORDER BY Name LIMIT 7';
    //     List<String> parameters = new List<String> {fields, sObjectName};
    //     String queryFormatted = String.format(template, parameters);
    //     return Database.query(queryFormatted);
    // }

    //fieldListApiName

    @AuraEnabled(Cacheable = true)
    public static List<SObject> getRecordList(List<String> addInfo, String sObjectName, String searchKey){
        String key = '%' + String.escapeSingleQuotes(searchKey) + '%';
        List<String> fieldsList = new List<String>{'Id', 'Name'};
        System.debug(addInfo);
        System.debug(addInfo.size());
        if (addInfo.size() > 0 && String.isNotBlank(addInfo[0])) {
            for(String field : addInfo) {
                fieldsList.add(String.escapeSingleQuotes(field));
            }
        }     
        System.debug(fieldsList);
        String fields = String.join(fieldsList, ', ');
        System.debug(fields);
        String template = 'SELECT {0} FROM {1} WHERE Name LIKE :key ORDER BY Name LIMIT 7';
        List<String> parameters = new List<String> {fields, sObjectName};
        String queryFormatted = String.format(template, parameters);
        System.debug(queryFormatted);
        return Database.query(queryFormatted);
    }

    @AuraEnabled(Cacheable = true)
    public static List<String> getAllObjectList(){
        List<String> objectNames = new List<String>();
        for ( Schema.SObjectType name : Schema.getGlobalDescribe().values() ) {
            DescribeSObjectResult dsr = name.getDescribe();
            if(dsr.isAccessible() && dsr.isSearchable() && dsr.isQueryable()) {
                objectNames.add(dsr.getName());
            }
        }
        return objectNames;
    }
}
 