package com.autofiliation.autofiliation;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.Circle;
import com.google.android.gms.maps.model.CircleOptions;
import com.google.android.gms.maps.model.Dash;
import com.google.android.gms.maps.model.Dot;
import com.google.android.gms.maps.model.Gap;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.PatternItem;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.Timestamp;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentChange;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

//***
public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private LocationManager locationmanager;
    //***
    private double enlem;
    private double boylam;

    private static ArrayList<Double> pastLocationsLatitude = new ArrayList<>();
    private static ArrayList<Double> pastLocationsLongitude = new ArrayList<>();
    private static ArrayList<Timestamp> pastLocationsTime= new ArrayList<>();

    @SuppressLint("MissingPermission")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

    }


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */

    /**
     * This function gets different location last 5 days
     */
    private void getPastLocations(){

        Date  mydate = new Date();
        Date lastdays = new Date();
        int a=10;

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

                        if(pastLocationsLongitude.size() != 0) {
                            if (pastLocationsLatitude.get(pastLocationsLatitude.size() - 1) == ((Double)doc.getData().get("Latitude"))
                                    && pastLocationsLongitude.get(pastLocationsLongitude.size() - 1) == ((Double)doc.getData().get("Longitude"))) {
                                continue;
                            }
                        }
                        pastLocationsLatitude.add((Double) doc.getData().get("Latitude"));
                        pastLocationsLongitude.add((Double) doc.getData().get("Longitude"));
                        pastLocationsTime.add((Timestamp) doc.getData().get("Time"));


                        Date s= ((Timestamp) doc.getData().get("Time")).toDate();
                        SimpleDateFormat sdf=new SimpleDateFormat("E, dd-M-yyyy hh:mm");
                        String strDate = sdf.format(s);

                        //adding providing marker
                        LatLng my_location = new LatLng((Double) doc.getData().get("Latitude"), (Double) doc.getData().get("Longitude"));
                        mMap.addMarker(new MarkerOptions().icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_ORANGE)).position(my_location).title(strDate));

                    }

                }

            }
        });
    }

    @SuppressLint("MissingPermission")
    @Override
    public void onMapReady(GoogleMap googleMap) {

        mMap = googleMap;
        mMap.setMapType(GoogleMap.MAP_TYPE_NORMAL);
        locationmanager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        LocationListener locationListener = new LocationListener() {
            @Override
            public void onLocationChanged(@NonNull Location location) {
                enlem = location.getLatitude();
                boylam = location.getLongitude();
                LatLng my_location = new LatLng(enlem, boylam );

                mMap.addMarker(new MarkerOptions().position(my_location).title("My current location"));
                mMap.moveCamera(CameraUpdateFactory.newLatLng(my_location));

                getPastLocations();

                //camera zoom in
                mMap.animateCamera( CameraUpdateFactory.zoomTo( 16.4f ) );

                //Draw circle
                java.util.List<PatternItem> pattern = Arrays.<PatternItem>asList(new Dot());
                Circle circle = mMap.addCircle(new CircleOptions()
                        .center(my_location)
                        .radius(64)
                        .strokeColor(Color.BLUE)
                        .strokeWidth(3f)
                        .strokePattern(pattern)
                        .fillColor(Color.argb(20,0,0,150))
                        );

                //kkm
                LatLng my_location2 = new LatLng(39.8938, 32.7864 );
                java.util.List<PatternItem> pattern2 = Arrays.<PatternItem>asList(new Gap(10));
                Circle circle2 = mMap.addCircle(new CircleOptions()
                        .center(my_location2)
                        .radius(69)
                        .strokeWidth(3f)
                        .strokePattern(pattern2)
                        .fillColor(Color.argb(140,255,153,0))
                );

                //çarşı
                LatLng my_location3 = new LatLng(39.8926, 32.7879 );
                java.util.List<PatternItem> pattern3 = Arrays.<PatternItem>asList(new Gap(10));
                Circle circle3 = mMap.addCircle(new CircleOptions()
                        .center(my_location3)
                        .radius(60)
                        .strokeWidth(3f)
                        .strokePattern(pattern2)
                        .fillColor(Color.argb(180,255,20,0))
                );

                //yurt
                LatLng my_location4 = new LatLng(39.8901, 32.7885 );
                java.util.List<PatternItem> pattern4 = Arrays.<PatternItem>asList(new Gap(10));
                Circle circle4 = mMap.addCircle(new CircleOptions()
                        .center(my_location4)
                        .radius(100)
                        .strokeWidth(3f)
                        .strokePattern(pattern2)
                        .fillColor(Color.argb(180,255,20,0))
                );

                //devrim
                LatLng my_location5 = new LatLng(39.8914, 32.7863 );
                java.util.List<PatternItem> pattern5 = Arrays.<PatternItem>asList(new Gap(10));
                Circle circle5 = mMap.addCircle(new CircleOptions()
                        .center(my_location5)
                        .radius(70)
                        .strokeWidth(3f)
                        .strokePattern(pattern2)
                        .fillColor(Color.argb(180,255,20,0))
                );

                //bölüm
                LatLng my_location6 = new LatLng(39.8916, 32.7835 );
                java.util.List<PatternItem> pattern6 = Arrays.<PatternItem>asList(new Gap(10));
                Circle circle6 = mMap.addCircle(new CircleOptions()
                        .center(my_location6)
                        .radius(45)
                        .strokeWidth(3f)
                        .strokePattern(pattern2)
                        .fillColor(Color.argb(130,0,150,0))
                );

                //çatı
                LatLng my_location7 = new LatLng(39.8926, 32.7818 );
                java.util.List<PatternItem> pattern7 = Arrays.<PatternItem>asList(new Gap(10));
                Circle circle7 = mMap.addCircle(new CircleOptions()
                        .center(my_location7)
                        .radius(60)
                        .strokeWidth(3f)
                        .strokePattern(pattern2)
                        .fillColor(Color.argb(130,255,153,0))
                );

                //ee
                LatLng my_location8 = new LatLng(39.8902, 32.7814 );
                java.util.List<PatternItem> pattern8 = Arrays.<PatternItem>asList(new Gap(10));
                Circle circle8 = mMap.addCircle(new CircleOptions()
                        .center(my_location8)
                        .radius(58)
                        .strokeWidth(3f)
                        .strokePattern(pattern2)
                        .fillColor(Color.argb(130,0,160,0))
                );



            }
        };
        locationmanager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 300000, 0, locationListener);


        //mMap.setMyLocationEnabled();
        // Add a marker in Sydney and move the camera
        //LatLng metu = new LatLng(39.89, 32.78);

    }
}