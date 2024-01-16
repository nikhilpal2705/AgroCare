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
        String DUPLICATE_EMAIL = "Email already in use.";
        String INCORRECT_PASSWORD = "Password is incorrect.";
        String REGISTRATION_SUCCESS = "Registration successful! Please log in.";
        String INTERNAL_SERVER_ERROR = "Internal Server Error";
        String SOME_ERROR_OCCURRED = "Some error occurred";
        String CROP_ADDED_SUCCESS = "Crop added successfully";
        String CROP_ADDED_ERROR = "Error while adding crop";
        String CROP_DELETED_SUCCESS = "Crop deleted successfully";
        String CROP_DELETED_ERROR = "Error while deleting crop";
        String CROP_FETCH_ERROR = "Error while fetching crops";
        String CROP_UPDATED_SUCCESS = "Crop updated successfully";
        String CROP_UPDATING_ERROR = "Error while updating crop";
        String CROP_NOT_FOUND = "Crop not found !! ";
        String PEST_FETCH_ERROR = "Error while fetching pests";
        String PEST_ADDED_ERROR = "Error while adding pest";
        String PEST_ADDED_SUCCESS = "Pest added successfully";
        String PEST_DELETED_ERROR = "Error while deleting pest";
        String PEST_DELETED_SUCCESS = "Pest deleted successfully";
        String PEST_UPDATED_SUCCESS = "Pest updated successfully";
        String PEST_UPDATING_ERROR = "Error while updating pest";
        String PEST_NOT_FOUND = "Pest not found !! ";
        String USER_ID_NOT_AVAILABLE = "User id not available";
        String INVALID_USERNAME_PASSWORD = "Invalid Username or Password !!";
        String USER_NOT_FOUND_BY_USERNAME = "User Not Found with username !! ";
        String INVALID_USER_ID = "Invalid User Id !!";
        String CROP_CONNECTED_WITH_PESTS = "Crop connected with pests";
    }

    public interface NullCheck {
        int INT = 0;
    }

}