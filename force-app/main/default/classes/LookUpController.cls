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
            if(dsr.isAccessible() && dsr.isQueryable() && dsr.isSearchable()) {
                objectNames.add(dsr.getName());
            }
        }
        return objectNames;
    }

    // @AuraEnabled(Cacheable = true)
    // public static List<String> getAllObjectList(){ 
    //     List<String> objectNames = new List<String>();
    //     for (Schema.SObjectType objectName : Schema.getGlobalDescribe().Values()) {
    //         Schema.sObjectType objectTypeName = Schema.getGlobalDescribe().get(objectName.getDescribe().getName());    
    //         Map<String, Schema.SObjectField> mapFieldList = objectTypeName.getDescribe().fields.getMap();
    //         for (Schema.SObjectField field : mapFieldList.values()) {    
    //             Schema.DescribeFieldResult fieldResult = field.getDescribe(); 
    //             String fieldName = String.ValueOf(fieldResult.getName());
    //             if (fieldResult.isAccessible() && fieldName.equalsIgnoreCase('Name')) {
    //                 String sObjectName = String.valueOf(objectTypeName);
    //                 System.debug('T ' + sObjectName);
    //                 objectNames.add(sObjectName); 
    //             }
    //         }  
    //     }
    //     System.debug(objectNames);
    //     return objectNames;
    // }

    // @AuraEnabled(Cacheable = true)
    // public static List<String> getAllObjectList(){
    //     // return [SELECT SObjectType FROM ObjectPermissions GROUP BY SObjectType ORDER BY SObjectType ASC];
    //     Set<String> objectNames = new Set<String>();
    //     for ( ObjectPermissions item : [SELECT SObjectType FROM ObjectPermissions ORDER BY SObjectType ASC]) {
	// 	    objectNames.add(item.SObjectType);
    //     }
    //     return new List<String>(objectNames);
    // }
}
 