package com.autofiliation.autofiliation;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;

import java.sql.Timestamp;
import java.util.Calendar;

public class RegisterActivity extends AppCompatActivity {

    private FirebaseAuth firebaseAuth;
    private FirebaseFirestore firebaseFirestore;

    private DatePickerDialog.OnDateSetListener dateSetListener;

    private EditText nameText, surnameText, emailText, passwordText;
    private TextView birthdateText;
    private CheckBox chronicDiseaseCheck;
    int chosenYear, chosenMonth, chosenDay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        firebaseAuth = FirebaseAuth.getInstance();
        firebaseFirestore = FirebaseFirestore.getInstance();

        nameText = findViewById(R.id.editTextNameRegister);
        surnameText = findViewById(R.id.editTextSurnameRegister);
        emailText = findViewById(R.id.editTextEmailAddressRegister);
        passwordText = findViewById(R.id.editTextPasswordRegister);
        birthdateText = findViewById(R.id.textViewBirthdayRegister);
        chronicDiseaseCheck = findViewById(R.id.checkBoxChronicDiseaseRegister);

        /* PopUp Calendar Start */
        birthdateText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int year = chosenYear; //calendar will start with this date
                int month = chosenMonth;
                int day = chosenDay;

                DatePickerDialog datePickerDialog = new DatePickerDialog(RegisterActivity.this, R.style.ThemeOverlay_AppCompat_Dialog, dateSetListener, year, month, day);
                datePickerDialog.show();
            }
        });

        dateSetListener = new DatePickerDialog.OnDateSetListener() {
            @Override
            public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
                String date = dayOfMonth + "/" + (month + 1) + "/" + year;
                birthdateText.setText(date);
                chosenYear = year;
                chosenMonth = month;
                chosenDay = dayOfMonth;
            }
        };
        /* PopUp Calendar End */
    }

    public void RegisterClicked(View view) {

        final String name = nameText.getText().toString();
        final String surname = surnameText.getText().toString();
        final String email = emailText.getText().toString();
        final String password = passwordText.getText().toString();
        final boolean chronicDisease = chronicDiseaseCheck.isChecked();

        Calendar calendar = Calendar.getInstance();
        calendar.set(chosenYear, chosenMonth, chosenDay, 0, 0, 0);
        final Timestamp birthdate = new Timestamp(calendar.getTimeInMillis());

        if (email.matches("")) {

        } else {
            firebaseAuth.createUserWithEmailAndPassword(email, password).addOnSuccessListener(new OnSuccessListener<AuthResult>() {
                @Override
                public void onSuccess(AuthResult authResult) {
                    Toast.makeText(RegisterActivity.this, "Registration successful!", Toast.LENGTH_LONG).show();
                    User newUser = new User(name, surname, email, birthdate, chronicDisease); //create new user from User class then push it to fireStore
                    firebaseFirestore.collection("Users").document(newUser.getEmail()).set(newUser).addOnSuccessListener(new OnSuccessListener<Void>() {
                        @Override
                        public void onSuccess(Void aVoid) {
                            Intent intent = new Intent(RegisterActivity.this, MainActivity.class);
                            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK); //close old activities
                            startActivity(intent);
                        }
                    }).addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            Toast.makeText(RegisterActivity.this, e.getLocalizedMessage().toString(), Toast.LENGTH_LONG).show();
                        }
                    });
                }
            }).addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception e) {
                    Toast.makeText(RegisterActivity.this, e.getLocalizedMessage().toString(), Toast.LENGTH_LONG).show();
                }
            });

        }

    }

}