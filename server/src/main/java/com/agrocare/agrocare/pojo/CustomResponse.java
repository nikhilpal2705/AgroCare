package com.agrocare.agrocare.pojo;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CustomResponse {
    private boolean success = false;
    private Object result = null;
    private String message;

    public CustomResponse(String message) {
        this.message = message;
    }

    public CustomResponse(Object result) {
        this.result = result;
    }

    public CustomResponse(boolean success, Object result) {
        this.success = success;
        this.result = result;
    }

    public CustomResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

}