package com.autofiliation.autofiliation;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.fragment.app.Fragment;

import android.Manifest;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.LocationManager;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.Toast;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.firebase.Timestamp;
import com.google.firebase.auth.FirebaseAuth;

import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;


public class MainActivity extends AppCompatActivity {
    private FirebaseAuth firebaseAuth;
    private final int PERMISSION_ID = 20;
    private BottomNavigationView bottomNavigationView;

    private static ArrayList<Double> pastLocationsLatitude = new ArrayList<>();
    private static ArrayList<Double> pastLocationsLongitude = new ArrayList<>();
    private static ArrayList<Timestamp> pastLocationsTime= new ArrayList<>();


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.options_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if(item.getItemId() == R.id.signOut){
            firebaseAuth.signOut();
            Intent intent = new Intent(MainActivity.this, LoginActivity.class);
            startActivity(intent);
            finish();
        }
        return super.onOptionsItemSelected(item);
    }



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bottomNavigationView=findViewById(R.id.bottomNav);
        bottomNavigationView.setOnNavigationItemSelectedListener(bottomNavMethod);
        getSupportFragmentManager().beginTransaction().replace(R.id.container,new HomeFragment()).commit();



        firebaseAuth= FirebaseAuth.getInstance();

        if(!checkPermissions()){
            requestPermissions();
        }
        else{
            setAlarm();
        }
        if(!isLocationEnabled()){
            Toast.makeText(this, "Please turn on" + " your location...", Toast.LENGTH_LONG).show();
            Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
            startActivity(intent);
        }

        /**
         * Start of Collection
         * Get Different locations last 5 day
         */
        Date  mydate = new Date();
        Date lastdays = new Date();
        int a=5;

        lastdays.setDate(lastdays.getDate() - a);

        FirebaseFirestore db = FirebaseFirestore.getInstance();
        CollectionReference IOTransactions = db.collection("Locations");

        Query transactionsQuery = IOTransactions.whereLessThan("Time", mydate).whereGreaterThan("Time", lastdays);

        transactionsQuery.addSnapshotListener(new EventListener<QuerySnapshot>() {
            @Override
            public void onEvent(@Nullable QuerySnapshot queryDocumentSnapshots, @Nullable FirebaseFirestoreException e) {
                if (e != null) {
                    Log.w("FirestoreDemo", "Listen failed.", e);
                    return;
                }
                for (QueryDocumentSnapshot doc : queryDocumentSnapshots) {
                    if (doc.get("Latitude") != null) {
                        //System.out.println("*****************");

                        if(pastLocationsLongitude.size() != 0) {
                            if (pastLocationsLatitude.get(pastLocationsLatitude.size() - 1) == doc.getData().get("Latitude")
                                    && pastLocationsLongitude.get(pastLocationsLongitude.size() - 1) == doc.getData().get("Longitude")) {
                                continue;
                            }
                        }
                        else{

                            pastLocationsLatitude.add((Double) doc.getData().get("Latitude"));
                            pastLocationsLongitude.add((Double) doc.getData().get("Longitude"));
                            pastLocationsTime.add((Timestamp) doc.getData().get("Time"));
                        }
                    }
                }
                System.out.println(pastLocationsLatitude);
                System.out.println(pastLocationsLongitude);
                System.out.println(pastLocationsTime);
            }
        });
        /**
         * End of Collection
         */

    }

    private BottomNavigationView.OnNavigationItemSelectedListener bottomNavMethod=new
            BottomNavigationView.OnNavigationItemSelectedListener() {
                @Override
                public boolean onNavigationItemSelected(@NonNull MenuItem item) {

                    Fragment fragment=null;
                    switch (item.getItemId())
                    {
                        case R.id.home:
                            fragment=new HomeFragment();
                            break;

                        case R.id.account:
                            fragment=new AccountFragment();
                            break;

                        case R.id.location:
                            Intent newintent = new Intent(MainActivity.this,MapsActivity.class);
                            startActivity(newintent);
                            fragment=new LocationFragment();
                            break;

                        case  R.id.setting:
                            fragment=new SettingsFragment();
                            break;
                    }
                    getSupportFragmentManager().beginTransaction().replace(R.id.container,fragment).commit();


                    return true;
                }
            };


    private boolean isLocationEnabled() {
        LocationManager locationManager = (LocationManager) this.getSystemService(this.LOCATION_SERVICE);

        return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER) || locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
    }

    // method to check for permissions
    private boolean checkPermissions() {
        return ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
                && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_BACKGROUND_LOCATION) == PackageManager.PERMISSION_GRANTED;
    }

    // method to request for permissions
    private void requestPermissions() {
        ActivityCompat.requestPermissions(this,
                new String[] {
                        Manifest.permission.ACCESS_COARSE_LOCATION,
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.ACCESS_BACKGROUND_LOCATION},
                PERMISSION_ID);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == 20) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                //if permission is granted, set alarm
                setAlarm();
                //myLocationManager.requestLocationUpdate();
            }
        }
    }


    private void setAlarm(){
        //getting the alarm manager
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);

        //creating a new intent specifying the broadcast receiver
        Intent intent = new Intent(this, MyAlarm.class);

        //creating a pending intent using the intent
        PendingIntent pendingIntent = PendingIntent.getBroadcast(this,0,intent,0);

        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        //calendar.add(Calendar.MINUTE, 1);

        //setting the repeating alarm that will be fired every X minutes
        alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), 30*1000, pendingIntent);
        Toast.makeText(this, "Alarm is set!", Toast.LENGTH_SHORT).show();
        System.out.println("Alarm is set!");
    }


}