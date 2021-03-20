package com.autofiliation.autofiliation;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

public class User {
    private String name;
    private String surname;
    private String email;
    private Timestamp birthdate;
    private boolean chronicDisease;
    private ArrayList<UserLocation> locations;

    public User(String name, String surname, String email, Timestamp birthdate, boolean chronicDisease) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.birthdate = birthdate;
        this.chronicDisease = chronicDisease;

        locations = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Timestamp getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Timestamp birthdate) {
        this.birthdate = birthdate;
    }

    public boolean isChronicDisease() {
        return chronicDisease;
    }

    public void setChronicDisease(boolean chronicDisease) {
        this.chronicDisease = chronicDisease;
    }

    public ArrayList<UserLocation> getLocations() {
        return locations;
    }

    public void addLocation(UserLocation userLocation) {
        locations.add(userLocation);
    }
}
