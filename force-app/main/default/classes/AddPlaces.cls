public with sharing class AddPlaces {

    public void addRating() {
        for(Integer i = 0; i < 100; i++) {
            BatchHandlePlaces  bhp = new BatchHandlePlaces(i);
            Database.executeBatch(bhp, 2000);   
        }
    }
}
