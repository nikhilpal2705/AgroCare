package com.agrocare.agrocare.pojo;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Builder
public class CustomResponse {
    private boolean success;
    private Object result;
    private String message;

    // for AllArgsConstructor
    public CustomResponse(boolean success, Object result, String message) {
        this.success = success;
        this.result = result;
        this.message = message;
    }

    // For POST/PUT/DELETE requests
    public CustomResponse(boolean success, String message) {
        this(success, null, message);
    }

    // For GET requests
    public CustomResponse(Object result) {
        this(true, result, null);
    }

    // For ERROR
    public CustomResponse(String message) {
        this(false, null, message);
    }
}
