package com.autofiliation.autofiliation;

import com.google.firebase.firestore.ServerTimestamp;

import java.util.Date;

public class UserLocation {

    private Double longitude;
    private Double latitude;
    private @ServerTimestamp Date timestamp;
    private User user;

    public UserLocation(Double longitude,Double latitude,Date timestamp,User user){

        this.longitude = longitude;
        this.latitude = latitude;
        this.timestamp = timestamp;
        this.user = user;
    }
    public UserLocation(){

    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
