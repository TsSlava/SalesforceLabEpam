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
        // return [SELECT SObjectType FROM ObjectPermissions GROUP BY SObjectType ORDER BY SObjectType ASC];
        List<String> objectNames = new List<String>();
        for ( Schema.SObjectType name : Schema.getGlobalDescribe().values() ) {
	        String sObjName = String.valueOf(name);
		        objectNames.add(sObjName);
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
    //             String stringName = String.ValueOf(fieldResult.getName());
    //             if (fieldResult.isAccessible() && stringName.equalsIgnoreCase('Name')) {
    //                 String sObjectName = String.valueOf(objectTypeName);
    //                 objectNames.add(sObjectName); 
    //             }
    //         }  
    //     }
    //     return objectNames;
    // }
}
 