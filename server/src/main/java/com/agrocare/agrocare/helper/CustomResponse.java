package com.agrocare.agrocare.helper;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomResponse {
    private boolean success;
    private Object result;
    private String message;
}