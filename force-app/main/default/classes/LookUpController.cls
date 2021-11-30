public with sharing class LookUpController {

    @AuraEnabled(Cacheable = true)
    public static List<SObject> getRecords(List<String> addInfo, String sObjectName, String searchKey){
        String key = '%' + String.escapeSingleQuotes(searchKey) + '%';
        List<String> fieldsList = new List<String>{'Id', 'Name'};
        if (addInfo.size() > 0 && String.isNotBlank(addInfo[0])) {
            for(String field : addInfo) {
                fieldsList.add(String.escapeSingleQuotes(field));
            }
        }     
        String fields = String.join(fieldsList, ', ');
        String template = 'SELECT {0} FROM {1} WHERE Name LIKE :key ORDER BY Name LIMIT 7';
        List<String> parameters = new List<String> {fields, sObjectName};
        String queryFormatted = String.format(template, parameters);
        SObjectAccessDecision queryAccessDecision = Security.stripInaccessible(
	                                   AccessType.READABLE,
	                                   Database.query(queryFormatted));
        return queryAccessDecision.getRecords();
    }

    @AuraEnabled(Cacheable = true)
    public static List<String> getQueriableSObjectApiNames(){
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
 