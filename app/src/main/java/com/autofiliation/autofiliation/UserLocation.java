package com.autofiliation.autofiliation;

public class UserLocation {

    private Double longitude;
    private Double latitude;
    private Double altitude;
    private long time;

    public UserLocation(Double longitude, Double latitude, long time) {

        this.longitude = longitude;
        this.latitude = latitude;
        this.time = time;
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

    public Double getAltitude() {
        return altitude;
    }

    public void setAltitude(Double altitude) {
        this.altitude = altitude;
    }

    public long getTime() {
        return time;
    }

    public void setTime(long time) {
        this.time = time;
    }
}
