package com.agrocare.agrocare.helper;

public class Constants {
    public static final String BASE_URL = "https://localhost:9000";

    // HttpStatus interface
    public interface Status {
        int ACTIVE = 1;
        int INACTIVE = 2;
        int DELETE = 3;
    }

    public interface Messages {
        String DUPLICATE_EMAIL_MESSAGE = "Email already in use.";
        String INCORRECT_PASSWORD_MESSAGE = "Password is incorrect.";
        String REGISTRATION_SUCCESS_MESSAGE = "Registration successful! Please log in.";
        String INTERNAL_SERVER_ERROR_MESSAGE = "Internal Server Error";
        String CROP_ADDED_SUCCESS_MESSAGE = "Crop added successfully";
        String CROP_ADDED_ERROR_MESSAGE = "Error while adding crop";
        String CROP_DELETED_SUCCESS_MESSAGE = "Crop deleted successfully";
        String CROP_DELETED_ERROR_MESSAGE = "Error while deleting crop";
        String SOME_ERROR_OCCURED = "Some error occured";
        String CROP_FETCH_ERROR_MESSAGE = "Error while fetching crops";
        String CROP_UPDATED_SUCCESS_MESSAGE = "Crop updated successfully";
    }

}