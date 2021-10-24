public with sharing class Test {
    public Test() {
        Integer a = 5;
        Integer b = 6;
        Integer sum = a + b;
        System.debug(sum);
    }

    public static List<Account> getAllActiveAccounts() {
        return [SELECT Id,Name,Active__c FROM Account WHERE Active__c = 'Yes'];
      }
}
