package com.autofiliation.autofiliation;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.Looper;
import android.util.Log;

import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.Timestamp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.DocumentChange;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.Calendar;
import java.util.HashMap;

import static android.provider.Settings.System.getString;

public class MyLocationManager {
    private Context context;
    private UserLocation mUserLocation;

    private void saveLocationToDatabase(Location location){
        System.out.println("Save to db");
        FirebaseFirestore firebaseFirestore = FirebaseFirestore.getInstance();

        HashMap<String,Object> data = new HashMap<>();
        data.put("Time", Calendar.getInstance().getTime());
        data.put("Latitude", location.getLatitude());
        data.put("Longitude", location.getLongitude());

        firebaseFirestore.collection("Locations").add(data).addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
            @Override
            public void onSuccess(DocumentReference documentReference) {
                System.out.println("SUCCESS");
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                System.out.println("FAIL");
            }
        });
    }

    private void saveUserLocation(Location location){

        FirebaseFirestore firebaseFirestore = FirebaseFirestore.getInstance();
        if(mUserLocation != null){
            DocumentReference locationRef = firebaseFirestore
                    .collection("UserLocation")
                    .document(FirebaseAuth.getInstance().getUid());

            locationRef.set(mUserLocation).addOnCompleteListener(new OnCompleteListener<Void>() {
                @Override
                public void onComplete(@NonNull Task<Void> task) {
                    if(task.isSuccessful()){
                        Log.d("TAG", "saveUserLocation: \ninserted user location into database." +
                                "\n latitude: " + mUserLocation.getLatitude() +
                                "\n longitude: " + mUserLocation.getLongitude());
                    }
                }
            });
        }
    }


    private void getUserDetails(){
        FirebaseFirestore firebaseFirestore = FirebaseFirestore.getInstance();

        if(mUserLocation == null){
            mUserLocation = new UserLocation();
            DocumentReference userRef = firebaseFirestore
                    .collection("UserLocation")
                    .document(FirebaseAuth.getInstance().getUid());

            userRef.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
                @Override
                public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                    if(task.isSuccessful()){
                        Log.d("TAG", "onComplete: successfully set the user client.");
                        User user = task.getResult().toObject(User.class);
                        mUserLocation.setUser(user);
                        //saveLocationToDatabase(mUserLocation);
                    }
                }
            });
        }
        else{
            //saveLocationToDatabase(mUserLocation);
        }
    }



    public MyLocationManager(Context context) {
        this.context = context;
    }
    @SuppressLint("MissingPermission")
    public void requestLocationUpdate(){
        LocationManager locationManager = (LocationManager) context.getSystemService(Context.LOCATION_SERVICE);
        LocationListener locationListener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                //saveLocationToDatabase(location);
                //saveUserLocation(location);
            }

            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {

            }

            @Override
            public void onProviderEnabled(String provider) {

            }

            @Override
            public void onProviderDisabled(String provider) {

            }
        };
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER,600000,0,locationListener);
        //locationManager.requestSingleUpdate(LocationManager.GPS_PROVIDER, this, Looper.getMainLooper());
    }



}
